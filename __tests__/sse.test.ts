import { describe, expect, it } from "vitest";

import { sseToText } from "@/utils/sse";

async function run(chunks: string[]): Promise<string> {
  const source = new ReadableStream<string>({
    start(controller) {
      chunks.forEach((chunk) => controller.enqueue(chunk));
      controller.close();
    },
  });

  let out = "";
  const reader = source.pipeThrough(sseToText()).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) return out;
    out += value;
  }
}

const event = (content: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;

describe("sseToText", () => {
  it("joins the delta content of each event", async () => {
    expect(await run([event("Hola"), event(", soy"), event(" Javi"), "data: [DONE]\n\n"])).toBe(
      "Hola, soy Javi"
    );
  });

  it("handles an event split across chunks", async () => {
    const full = event("partido en dos");
    expect(await run([full.slice(0, 20), full.slice(20)])).toBe("partido en dos");
  });

  it("ignores events without content and non-JSON lines", async () => {
    const roleOnly = `data: ${JSON.stringify({ choices: [{ delta: { role: "assistant" } }] })}\n\n`;
    expect(await run([roleOnly, ": keep-alive\n", "data: no-json\n", event("ok")])).toBe("ok");
  });

  it("flushes a last event with no trailing newline", async () => {
    expect(await run([event("fin").trimEnd()])).toBe("fin");
  });
});
