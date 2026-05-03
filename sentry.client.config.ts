// sentry.client.config.ts — va en la RAIZ del proyecto
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Porcentaje de transacciones para performance monitoring (10%)
  tracesSampleRate: 0.1,

  // Replay de sesiones para debugging visual
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Solo enviar errores en produccion
  enabled: process.env.NODE_ENV === "production",

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
});
