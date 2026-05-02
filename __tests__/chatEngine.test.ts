import { describe, it, expect } from "vitest";
import {
  getChatResponse,
  isValidQuestion,
  calculateTypingDelay,
  extractKeywords,
  isQuestionAbout,
  getContextualSuggestions,
} from "@/app/services/chatEngine";

// ============================================
// isValidQuestion
// ============================================
describe("isValidQuestion", () => {
  it("returns true for valid questions", () => {
    expect(isValidQuestion("¿Qué tecnologías usas?")).toBe(true);
    expect(isValidQuestion("Hola")).toBe(true);
    expect(isValidQuestion("abc")).toBe(true);
  });

  it("rejects too short questions", () => {
    expect(isValidQuestion("")).toBe(false);
    expect(isValidQuestion("ab")).toBe(false);
    expect(isValidQuestion("  ")).toBe(false);
  });

  it("rejects too long questions (>500 chars)", () => {
    const longStr = "a".repeat(501);
    expect(isValidQuestion(longStr)).toBe(false);
  });

  it("accepts exactly 500 characters", () => {
    const exact = "a".repeat(500);
    expect(isValidQuestion(exact)).toBe(true);
  });
});

// ============================================
// calculateTypingDelay
// ============================================
describe("calculateTypingDelay", () => {
  it("returns at least 500ms for short answers", () => {
    expect(calculateTypingDelay("Hi")).toBeGreaterThanOrEqual(500);
  });

  it("returns at most 2500ms for long answers", () => {
    const longAnswer = "word ".repeat(1000);
    expect(calculateTypingDelay(longAnswer)).toBeLessThanOrEqual(2500);
  });

  it("scales with word count within range", () => {
    const short = calculateTypingDelay("Hello world");
    const medium = calculateTypingDelay("word ".repeat(50));
    expect(medium).toBeGreaterThanOrEqual(short);
  });
});

// ============================================
// extractKeywords
// ============================================
describe("extractKeywords", () => {
  it("removes Spanish stop words", () => {
    const keywords = extractKeywords("¿Qué tecnologías y herramientas usas para el frontend?");
    expect(keywords).not.toContain("que");
    expect(keywords).not.toContain("para");
    expect(keywords).toContain("tecnologias");
  });

  it("removes English stop words", () => {
    const keywords = extractKeywords("What are the technologies you use?");
    expect(keywords).not.toContain("what");
    expect(keywords).not.toContain("the");
    expect(keywords).toContain("technologies");
  });

  it("filters words shorter than 3 characters", () => {
    const keywords = extractKeywords("I am a dev");
    keywords.forEach((kw) => {
      expect(kw.length).toBeGreaterThan(2);
    });
  });

  it("normalizes accents", () => {
    const keywords = extractKeywords("tecnologías información");
    expect(keywords).toContain("tecnologias");
    expect(keywords).toContain("informacion");
  });
});

// ============================================
// isQuestionAbout
// ============================================
describe("isQuestionAbout", () => {
  it("matches topics case-insensitively", () => {
    expect(isQuestionAbout("¿Qué tecnologías usas?", "tecnologías")).toBe(true);
    expect(isQuestionAbout("Tell me about React", "react")).toBe(true);
  });

  it("returns false for unrelated topics", () => {
    expect(isQuestionAbout("¿Dónde trabajas?", "react")).toBe(false);
  });
});

// ============================================
// getChatResponse
// ============================================
describe("getChatResponse", () => {
  it("returns a greeting response for 'hola'", () => {
    const response = getChatResponse("hola", "es");
    expect(response.answer).toBeTruthy();
    expect(response.followUp).toBeDefined();
    expect(response.followUp!.length).toBeGreaterThan(0);
  });

  it("returns a greeting response for 'hello'", () => {
    const response = getChatResponse("hello", "en");
    expect(response.answer).toBeTruthy();
    expect(response.followUp).toBeDefined();
  });

  it("returns a farewell response for 'adiós'", () => {
    const response = getChatResponse("adiós", "es");
    expect(response.answer).toBeTruthy();
  });

  it("returns a default response for gibberish", () => {
    const response = getChatResponse("asdfghjkl xyz123", "es");
    expect(response.answer).toBeTruthy();
    // Default responses include follow-up suggestions
    expect(response.followUp).toBeDefined();
  });

  it("returns technology-related response for tech questions (ES)", () => {
    const response = getChatResponse("¿Qué tecnologías usas?", "es");
    expect(response.answer).toBeTruthy();
  });

  it("returns technology-related response for tech questions (EN)", () => {
    const response = getChatResponse("What technologies do you use?", "en");
    expect(response.answer).toBeTruthy();
  });

  it("always returns a non-empty answer string", () => {
    const inputs = ["hola", "bye", "react", "asdf", "¿experiencia?", "projects"];
    inputs.forEach((input) => {
      const response = getChatResponse(input, "es");
      expect(typeof response.answer).toBe("string");
      expect(response.answer.length).toBeGreaterThan(0);
    });
  });
});

// ============================================
// getContextualSuggestions
// ============================================
describe("getContextualSuggestions", () => {
  it("returns 3 suggestions for Spanish", () => {
    const suggestions = getContextualSuggestions([], "es");
    expect(suggestions).toHaveLength(3);
    suggestions.forEach((s) => expect(typeof s).toBe("string"));
  });

  it("returns 3 suggestions for English", () => {
    const suggestions = getContextualSuggestions([], "en");
    expect(suggestions).toHaveLength(3);
    suggestions.forEach((s) => expect(typeof s).toBe("string"));
  });
});
