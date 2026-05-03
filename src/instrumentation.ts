// instrumentation.ts — va en la RAIZ del proyecto (src/ si usas src directory)
// Next.js 13.4+ instrumentation hook para Sentry server-side

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}
