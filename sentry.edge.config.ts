// sentry.edge.config.ts — va en la RAIZ del proyecto
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Explicit: no IP / request PII attached to events (see privacy policy).
  sendDefaultPii: false,
  enabled: process.env.NODE_ENV === "production",
});
