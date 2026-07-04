import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Rate limiting simple en memoria (en producción usar Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests por minuto por IP
const RATE_WINDOW = 60_000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// System prompt con toda la info de Javi
const SYSTEM_PROMPT = `Eres el asistente virtual del portfolio de Javi García Magaldi, un Front-End Engineer con casi 6 años de experiencia.

REGLAS ESTRICTAS:
- Responde SOLO sobre Javi: su experiencia, proyectos, stack técnico, portfolio, SERVICIOS FREELANCE y cómo contratarle (freelance o en plantilla).
- Si te preguntan si hace freelance, qué servicios ofrece, presupuestos o cómo contratarle, responde con la sección SERVICIOS FREELANCE y anima a usar el formulario de contacto.
- Si te preguntan algo no relacionado con Javi, redirige amablemente al tema.
- Sé conciso (máximo 3-4 frases por respuesta).
- Usa un tono profesional pero cercano.
- Responde en el mismo idioma en que te pregunten (español o inglés).
- NUNCA inventes información que no esté aquí.
- Si no tienes la respuesta, sugiere contactar a Javi directamente.
- Incluye siempre 2-3 sugerencias de followUp al final.

INFORMACIÓN SOBRE JAVI:

PERFIL:
- Nombre: Javi García Magaldi
- Rol: Front-End Engineer (casi full-stack)
- Ubicación: Santander, Cantabria, España
- Experiencia: ~6 años profesionales
- Trabajo actual: AMS Solutions (desde mayo 2023), desarrollando apps para Inditex
- Email: magaldi6@gmail.com
- GitHub: github.com/maniacdi
- LinkedIn: linkedin.com/in/javimagaldi
- Estado: Empleado en AMS, pero DISPONIBLE para proyectos freelance y abierto a ofertas de empleo en plantilla.

SERVICIOS FREELANCE (enfoque: negocios pequeños/medianos, no enterprise):
- A quién ayuda: restaurantes, clínicas/dentistas, comercios y pymes que quieren algo directo y bien hecho.
- Web para tu negocio: presencia online rápida, clara y fácil de actualizar.
- Reservas / tienda online: que los clientes reserven o compren sin llamar.
- App móvil: iOS y Android (React Native / Expo).
- Software a medida: automatizaciones, herramientas internas, integraciones.
- Filosofía: sin paquetes raros ni letra pequeña; cuéntale qué necesitas y te lo monta. Responde en menos de 48h por el formulario de contacto.
- Para empresas grandes: prefiere incorporarse como desarrollador en plantilla más que llevar todo el proyecto como proveedor.

EXPERIENCIA LABORAL:
1. AMS Solutions (mayo 2023 - presente): Front-End Engineer para Inditex.
   - Lidera plataforma unificada de componentes
   - Diseñó BFF (Backend For Frontend) que redujo tiempos de respuesta ~60%
   - Impulsa testing (Jest, Cypress) y buenas prácticas
   - Mentoriza desarrolladores junior
   - Trabaja con React, Vue, TypeScript en apps usadas por miles de empleados

2. Innova-tsn (2022-2023, 10 meses): Front-End Developer/Consultant.
   - Componentes para apps corporativas
   - Análisis de requisitos con clientes
   - SQL para reporting

3. Incentro (2020-2022): Frontend Developer (empezó con prácticas).
   - Rediseñó web corporativa desde cero
   - Gestionó CMS y e-commerce de gran volumen
   - Automatizó procesos de contenidos

STACK TÉCNICO:
- Frontend: React (95%), Vue, TypeScript (95%), JavaScript, HTML5, CSS3/SASS, Tailwind, Framer Motion, Redux, Next.js
- Backend: Node.js (85%), Express, Java, BFF pattern
- Bases de datos: MongoDB, MySQL, SQL Server
- Testing: Jest, Cypress, TDD
- DevOps/Tools: Git/GitHub, Docker, AWS, Vercel, Agile/Scrum, Figma
- React Native, Expo (experiencia)

EDUCACIÓN:
- Grado en Informática, Universidad de Cantabria (2015-2019)
- TFG: Videojuego Pang en C#/Unity

PROYECTOS PERSONALES:
1. Portfolio (este sitio): Next.js, React, TypeScript, Framer Motion, SASS, i18n, mapa de viajes, easter eggs, chatbot IA, dark/light theme
2. Compras App: App de lista de compras colaborativa con React, TypeScript, Node.js, MongoDB (autenticación, listas compartidas, sync en tiempo real)
3. Insta Checker: Herramienta Python para analizar seguidores de Instagram
4. Marvel Explorer: Integración con Marvel API
5. Pokemon App: Backend Node.js con PokéAPI

IDIOMAS: Español (nativo), Inglés (B2-C1 profesional)

HOBBIES: Viajes (15+ países), anime (Naruto fan), videojuegos, tecnología, home server con Docker

SOFT SKILLS: Mentoría, code reviews, comunicación técnica clara, Agile/Scrum, trabajo remoto (2+ años), proactividad`;

export async function POST(request: NextRequest) {
  try {
    // Validar API key
    if (!GROQ_API_KEY) {
      // Fallback: devolver respuesta genérica si no hay key configurada
      return NextResponse.json({
        answer: "El chatbot con IA no está configurado todavía. Contacta a Javi directamente.",
        followUp: [],
      });
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    // Parsear body
    const body = await request.json();
    const { message, locale = "es", history = [] } = body;

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        { error: "Mensaje inválido" },
        { status: 400 }
      );
    }

    // Construir mensajes para Groq
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      // Incluir las últimas 6 mensajes del historial para contexto
      ...history.slice(-6).map((msg: { type: string; content: string }) => ({
        role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Llamar a Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 300,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);

      // Fallback a respuesta estática si Groq falla
      return NextResponse.json({
        answer: locale === "es"
          ? "Lo siento, ahora mismo no puedo procesar tu pregunta. ¿Podrías intentarlo de nuevo?"
          : "Sorry, I can't process your question right now. Could you try again?",
        followUp: locale === "es"
          ? ["¿Qué experiencia tiene Javi?", "¿Qué tecnologías usa?"]
          : ["What experience does Javi have?", "What technologies does he use?"],
      });
    }

    const data = await response.json();
    const aiAnswer = data.choices?.[0]?.message?.content || "";

    // Extraer followUp del response (el modelo incluye sugerencias al final)
    // Intentar parsear sugerencias si el modelo las incluye
    const followUpMatch = aiAnswer.match(/(?:Sugerencias?|Suggestions?|followUp|También puedes preguntar)[:.]?\s*[-•]?\s*(.+)/i);

    const answer = aiAnswer;
    let followUp: string[] = [];

    // Generar followUp basado en el contexto si el modelo no las incluye explícitamente
    if (locale === "es") {
      followUp = [
        "¿Qué tecnologías domina?",
        "¿Dónde ha trabajado?",
        "¿Qué proyectos tiene?",
      ];
    } else {
      followUp = [
        "What technologies does he use?",
        "Where has he worked?",
        "What projects has he built?",
      ];
    }

    return NextResponse.json({ answer, followUp });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
