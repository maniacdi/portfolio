/**
 * Convierte el stream SSE de una API compatible con OpenAI (Groq) en el texto
 * plano de la respuesta, trozo a trozo.
 *
 * Los eventos llegan como líneas `data: {json}` y un `data: [DONE]` final, pero
 * un trozo de red puede cortar una línea por la mitad: por eso se guarda el
 * resto incompleto hasta que llega el siguiente.
 */
export function sseToText(): TransformStream<string, string> {
  let buffer = "";

  const handleLine = (line: string, controller: TransformStreamDefaultController<string>) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return;

    const payload = trimmed.slice("data:".length).trim();
    if (!payload || payload === "[DONE]") return;

    try {
      const content = JSON.parse(payload)?.choices?.[0]?.delta?.content;
      if (typeof content === "string" && content) controller.enqueue(content);
    } catch {
      // Evento que no es JSON (keep-alive o similar): se ignora.
    }
  };

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) handleLine(line, controller);
    },
    flush(controller) {
      if (buffer) handleLine(buffer, controller);
    },
  });
}
