import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConsentValue = "granted" | "denied";

/**
 * Cookie / tracker consent (RGPD art. 6.1.a + LSSI-CE art. 22.2).
 *
 * Everything defaults to "denied": no non-essential script may load before the
 * user opts in, so the default state must be the rejection state. Strictly
 * necessary storage (theme, this very consent record) needs no consent and is
 * therefore not represented here.
 */
export interface ConsentState {
  /** false until the user has accepted or rejected — banner shows while false. */
  decided: boolean;
  /** Google Analytics 4 (cookies _ga / _gid, third-country transfer). */
  analytics: ConsentValue;
  /** Sentry Session Replay (records the session, not just the error). */
  monitoring: ConsentValue;
  /** UI-only: preferences panel is open (never persisted). */
  panelOpen: boolean;

  acceptAll: () => void;
  rejectAll: () => void;
  save: (choice: { analytics: ConsentValue; monitoring: ConsentValue }) => void;
  openPanel: () => void;
  closePanel: () => void;
  /** Revoke the stored decision so the banner appears again. */
  reset: () => void;
}

export const CONSENT_STORAGE_KEY = "portfolio-consent";

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      decided: false,
      analytics: "denied",
      monitoring: "denied",
      panelOpen: false,

      acceptAll: () =>
        set({ decided: true, analytics: "granted", monitoring: "granted", panelOpen: false }),
      rejectAll: () =>
        set({ decided: true, analytics: "denied", monitoring: "denied", panelOpen: false }),
      save: ({ analytics, monitoring }) =>
        set({ decided: true, analytics, monitoring, panelOpen: false }),
      openPanel: () => set({ panelOpen: true }),
      closePanel: () => set({ panelOpen: false }),
      reset: () =>
        set({ decided: false, analytics: "denied", monitoring: "denied", panelOpen: false }),
    }),
    {
      name: CONSENT_STORAGE_KEY,
      version: 1,
      // panelOpen is transient UI state; persisting it would reopen the panel
      // on every visit. The decision itself is what must survive reloads.
      partialize: (state) => ({
        decided: state.decided,
        analytics: state.analytics,
        monitoring: state.monitoring,
      }),
    }
  )
);
