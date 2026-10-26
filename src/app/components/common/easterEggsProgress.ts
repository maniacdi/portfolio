import { useSyncExternalStore } from "react";

// Shared between EasterEggs (writes the progress) and the footer logo, which
// switches to the graffiti tag once every egg has been found.
export const EASTER_EGGS_STORAGE_KEY = "portfolio-easter-eggs";
export const EASTER_EGGS_TOTAL = 4;
const PROGRESS_EVENT = "easter-eggs-progress";

export function readFoundEggs(): string[] {
  try {
    const saved = localStorage.getItem(EASTER_EGGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function writeFoundEggs(found: string[] | null) {
  try {
    if (found) localStorage.setItem(EASTER_EGGS_STORAGE_KEY, JSON.stringify(found));
    else localStorage.removeItem(EASTER_EGGS_STORAGE_KEY);
  } catch {
    // Storage blocked (private mode): progress just won't persist.
  }
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(PROGRESS_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** True once every easter egg has been found in this browser. */
export function useSignatureUnlocked() {
  return useSyncExternalStore(
    subscribe,
    () => readFoundEggs().length >= EASTER_EGGS_TOTAL,
    () => false
  );
}
