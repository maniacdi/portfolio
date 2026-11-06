import { useSyncExternalStore } from "react";

// Shared between EasterEggs (writes the progress) and the footer logo, which
// switches to the graffiti tag once every egg has been found.
export const EASTER_EGGS_STORAGE_KEY = "portfolio-easter-eggs";
export const EASTER_EGGS_TOTAL = 5;
export const PROGRESS_EVENT = "easter-eggs-progress";

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

/** Adds one egg to the found list (no-op if it was already there). */
export function unlockEgg(id: string) {
  const found = readFoundEggs();
  if (!found.includes(id)) writeFoundEggs([...found, id]);
}

// Bugs kicked by the hero avatar; squashing BUG_GOAL of them unlocks an egg.
const BUGS_STORAGE_KEY = "portfolio-bugs-squashed";
export const BUG_GOAL = 10;

export function readBugsSquashed(): number {
  try {
    return Number(localStorage.getItem(BUGS_STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function writeBugsSquashed(count: number) {
  try {
    localStorage.setItem(BUGS_STORAGE_KEY, String(count));
  } catch {
    // Storage blocked: the counter just resets on the next visit.
  }
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
