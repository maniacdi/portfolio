import { describe, it, expect } from "vitest";

/**
 * Easter Eggs configuration tests.
 *
 * We test the EASTER_EGGS config data directly since the component
 * relies on browser APIs (keydown events, localStorage, audio).
 * E2E tests in Cypress handle the actual interaction.
 */

// Replicate the config from EasterEggs.tsx for unit testing
const EASTER_EGGS = [
  { sequence: ["b", "n", "b"], id: "banana", name: "Banana Jump", duration: 3000 },
  { sequence: ["w", "o", "w"], id: "wow", name: "WOW Party", duration: 3000 },
  { sequence: ["k", "u", "n", "a", "i"], id: "kunai", name: "Kunai Naruto", duration: 4000 },
  { sequence: ["h", "e", "l", "p"], id: "terminal", name: "Terminal", duration: 0 },
  { sequence: ["b", "a", "n", "k", "a", "i"], id: "senbonzakura", name: "Senbonzakura", duration: 6000 },
];

describe("Easter Eggs Configuration", () => {
  it("has exactly 5 easter eggs defined", () => {
    expect(EASTER_EGGS).toHaveLength(5);
  });

  it("each egg has unique id", () => {
    const ids = EASTER_EGGS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each egg has a non-empty sequence", () => {
    EASTER_EGGS.forEach((egg) => {
      expect(egg.sequence.length).toBeGreaterThan(0);
      egg.sequence.forEach((key) => {
        expect(typeof key).toBe("string");
        expect(key.length).toBe(1);
      });
    });
  });

  it("no two eggs share the same sequence", () => {
    const seqs = EASTER_EGGS.map((e) => e.sequence.join(""));
    expect(new Set(seqs).size).toBe(seqs.length);
  });

  it("no sequence is a prefix of another", () => {
    for (let i = 0; i < EASTER_EGGS.length; i++) {
      for (let j = 0; j < EASTER_EGGS.length; j++) {
        if (i === j) continue;
        const seqA = EASTER_EGGS[i].sequence.join("");
        const seqB = EASTER_EGGS[j].sequence.join("");
        // A shorter sequence should not be a prefix of a longer one
        if (seqA.length < seqB.length) {
          expect(seqB.startsWith(seqA)).toBe(false);
        }
      }
    }
  });

  it("all durations are non-negative numbers", () => {
    EASTER_EGGS.forEach((egg) => {
      expect(egg.duration).toBeGreaterThanOrEqual(0);
    });
  });

  it("terminal egg has duration 0 (opens panel instead of toast)", () => {
    const terminal = EASTER_EGGS.find((e) => e.id === "terminal");
    expect(terminal).toBeDefined();
    expect(terminal!.duration).toBe(0);
  });

  it("banana sequence is bnb", () => {
    const banana = EASTER_EGGS.find((e) => e.id === "banana");
    expect(banana!.sequence).toEqual(["b", "n", "b"]);
  });

  it("senbonzakura has the longest sequence (6 keys)", () => {
    const maxLength = Math.max(...EASTER_EGGS.map((e) => e.sequence.length));
    const longest = EASTER_EGGS.find((e) => e.sequence.length === maxLength);
    expect(longest!.id).toBe("senbonzakura");
    expect(maxLength).toBe(6);
  });
});

// ---- Sequence detection logic (extracted) ----
function checkSequence(keys: string[], targetSequence: string[]): boolean {
  const lastKeys = keys.slice(-targetSequence.length);
  return (
    lastKeys.length === targetSequence.length &&
    lastKeys.every((key, index) => key === targetSequence[index])
  );
}

describe("Sequence detection logic", () => {
  it("detects exact match at end of key buffer", () => {
    expect(checkSequence(["x", "b", "n", "b"], ["b", "n", "b"])).toBe(true);
  });

  it("rejects partial match", () => {
    expect(checkSequence(["b", "n"], ["b", "n", "b"])).toBe(false);
  });

  it("rejects wrong order", () => {
    expect(checkSequence(["n", "b", "b"], ["b", "n", "b"])).toBe(false);
  });

  it("detects match with exact length", () => {
    expect(checkSequence(["b", "n", "b"], ["b", "n", "b"])).toBe(true);
  });

  it("handles longer buffers correctly", () => {
    const buffer = "abcdefghbankai".split("");
    expect(checkSequence(buffer, ["b", "a", "n", "k", "a", "i"])).toBe(true);
  });

  it("rejects empty buffer", () => {
    expect(checkSequence([], ["b", "n", "b"])).toBe(false);
  });
});
