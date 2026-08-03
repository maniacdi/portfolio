import { beforeEach, describe, expect, it } from "vitest";

import { useConsentStore } from "@/app/store/useConsentStore";

const DEFAULTS = {
  decided: false,
  analytics: "denied",
  monitoring: "denied",
  panelOpen: false,
} as const;

describe("useConsentStore", () => {
  beforeEach(() => {
    useConsentStore.setState({ ...DEFAULTS });
  });

  it("denies everything until the user decides", () => {
    const state = useConsentStore.getState();
    expect(state.decided).toBe(false);
    expect(state.analytics).toBe("denied");
    expect(state.monitoring).toBe("denied");
  });

  it("acceptAll grants both categories and closes the banner", () => {
    useConsentStore.getState().acceptAll();
    const state = useConsentStore.getState();
    expect(state.decided).toBe(true);
    expect(state.analytics).toBe("granted");
    expect(state.monitoring).toBe("granted");
    expect(state.panelOpen).toBe(false);
  });

  it("rejectAll records the decision while keeping everything denied", () => {
    useConsentStore.getState().rejectAll();
    const state = useConsentStore.getState();
    expect(state.decided).toBe(true);
    expect(state.analytics).toBe("denied");
    expect(state.monitoring).toBe("denied");
  });

  it("save stores a granular choice", () => {
    useConsentStore.getState().save({ analytics: "granted", monitoring: "denied" });
    const state = useConsentStore.getState();
    expect(state.decided).toBe(true);
    expect(state.analytics).toBe("granted");
    expect(state.monitoring).toBe("denied");
  });

  it("reset revokes consent so the banner shows again", () => {
    useConsentStore.getState().acceptAll();
    useConsentStore.getState().reset();
    const state = useConsentStore.getState();
    expect(state.decided).toBe(false);
    expect(state.analytics).toBe("denied");
    expect(state.monitoring).toBe("denied");
  });

  it("openPanel / closePanel only touch UI state, not the decision", () => {
    useConsentStore.getState().acceptAll();
    useConsentStore.getState().openPanel();
    expect(useConsentStore.getState().panelOpen).toBe(true);
    expect(useConsentStore.getState().analytics).toBe("granted");

    useConsentStore.getState().closePanel();
    expect(useConsentStore.getState().panelOpen).toBe(false);
  });

  it("persists the decision but never panelOpen", () => {
    const partialize = useConsentStore.persist.getOptions().partialize;
    const persisted = partialize?.({ ...useConsentStore.getState(), panelOpen: true }) ?? {};

    expect(Object.keys(persisted).sort()).toEqual(["analytics", "decided", "monitoring"]);
  });
});
