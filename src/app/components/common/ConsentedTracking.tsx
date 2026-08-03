"use client";

import { useEffect, useState } from "react";

import * as Sentry from "@sentry/nextjs";

import { useConsentStore } from "../../store/useConsentStore";

import GoogleAnalytics from "./GoogleAnalytics";

/**
 * Consent gate for every non-essential tracker.
 *
 * GA4 is not merely put in "denied" Consent Mode: the gtag script is never
 * injected until the user opts in, so no third-party request happens without
 * consent (AEPD's reading of LSSI-CE art. 22.2 — prior, informed, unambiguous).
 *
 * Sentry error reporting stays on (legitimate interest, PII disabled in
 * instrumentation-client.ts). Session Replay records the actual browsing
 * session, so its integration is only attached once "monitoring" is granted.
 */
export default function ConsentedTracking({ gaId }: { gaId?: string }) {
  const analytics = useConsentStore((s) => s.analytics);
  const monitoring = useConsentStore((s) => s.monitoring);

  // zustand/persist reads localStorage on the client only. Rendering the
  // script on the very first pass would desync SSR and client HTML.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (monitoring !== "granted") return;

    const client = Sentry.getClient();
    if (!client || client.getIntegrationByName("Replay")) return;

    client.addIntegration(Sentry.replayIntegration());
  }, [monitoring]);

  if (!hydrated || analytics !== "granted" || !gaId) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
