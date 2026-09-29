import { NextRequest, NextResponse } from "next/server";

import { getChatResponse } from "@/app/services/chatEngine";
import { clientIp, consume } from "@/utils/rateLimit";
import { sseToText } from "@/utils/sse";

import { buildSystemPrompt } from "./systemPrompt";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// Groq retira modelos cada pocos meses (llama-3.3-70b-versatile desapareció sin
// aviso): con GROQ_MODEL se cambia desde Vercel sin tocar código.
const GROQ_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

// Cada llamada gasta tokens de Groq, así que hay dos ventanas: una corta para
// el que le da en bucle y una larga para el que va a goteo.
const RATE_WINDOWS = [
  { limit: 15, windowMs: 60_000 }, // 15 por minuto
  { limit: 80, windowMs: 60 * 60_000 }, // 80 por hora
];

// Límites del payload. El historial lo manda el cliente, así que aquí se
// recorta: sin esto se pueden colar 6 mensajes gigantes e inflar la factura.
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 6;

interface HistoryMessage {
  type: string;
  content: string;
}

function sanitizeHistory(raw: unknown): HistoryMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (item): item is HistoryMessage =>
        !!item &&
        typeof item === "object" &&
        typeof (item as HistoryMessage).type === "string" &&
        typeof (item as HistoryMessage).content === "string"
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({ type: item.type, content: item.content.slice(0, MAX_MESSAGE_LENGTH) }));
}

export async function POST(request: NextRequest) {
  try {
    // Validar API key
    if (!GROQ_API_KEY) {
      // Sin key, el cliente responde con el motor local.
      return NextResponse.json({ error: "Chat IA no configurado" }, { status: 503 });
    }

    // Rate limiting
    const ip = clientIp(request.headers);
    const { allowed, retryAfterSeconds } = consume(ip ?? "sin-ip", RATE_WINDOWS);
    if (!allowed) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Intenta de nuevo en un rato." },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
      );
    }

    // Parsear body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Body inválido" }, { status: 400 });
    }

    const {
      message,
      locale: rawLocale,
      history: rawHistory,
    } = (body ?? {}) as {
      message?: unknown;
      locale?: unknown;
      history?: unknown;
    };

    if (typeof message !== "string" || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Mensaje inválido" },
        { status: 400 }
      );
    }

    const locale = rawLocale === "en" ? "en" : "es";

    // Sugerencias de seguimiento: las del motor local para esa pregunta, que
    // conoce los temas del portfolio. Van en una cabecera porque el cuerpo es
    // el stream de texto.
    const followUp = getChatResponse(message, locale).followUp ?? [];

    // Log sin IP ni identificadores: solo la pregunta, para ver qué pregunta
    // la gente y ajustar el contenido. Queda en los logs de Vercel unos días.
    console.info(JSON.stringify({ event: "chat_question", locale, question: message }));

    const messages = [
      { role: "system" as const, content: buildSystemPrompt(locale) },
      // Últimos mensajes del historial para contexto, ya recortados
      ...sanitizeHistory(rawHistory).map((msg) => ({
        role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const upstream = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.5,
        // Incluye el razonamiento del modelo, que no se envía al cliente.
        max_completion_tokens: 800,
        reasoning_effort: "low",
        stream: true,
      }),
      signal: request.signal,
    });

    if (!upstream.ok || !upstream.body) {
      console.error("Groq API error:", upstream.status, await upstream.text().catch(() => ""));
      // 502 para que el cliente tire del motor local en vez de pintar un error.
      return NextResponse.json({ error: "Modelo no disponible" }, { status: 502 });
    }

    const stream = upstream.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(sseToText())
      .pipeThrough(new TextEncoderStream());

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Chat-Follow-Up": encodeURIComponent(JSON.stringify(followUp)),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
