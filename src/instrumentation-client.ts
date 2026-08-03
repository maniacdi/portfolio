// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://83934e36f08d12a86d5c9faf27476981@o4511327390334976.ingest.de.sentry.io/4511327391907920",

  // Session Replay is NOT registered here on purpose: recording a browsing
  // session needs prior consent. ConsentedTracking attaches
  // Sentry.replayIntegration() once the user grants "monitoring".
  // These sample rates stay inert until that integration exists.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // No PII: without this the SDK would attach IP address and other identifying
  // request data, which we neither need nor declare in the privacy policy.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
