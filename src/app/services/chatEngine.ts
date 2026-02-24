import {
  ChatResponse,
  defaultResponsesES,
  farewellsES,
  greetingsES,
  knowledgeBaseES,
} from "@/utils/data/chatKnowledgeBase";
import {
  defaultResponsesEN,
  farewellsEN,
  greetingsEN,
  knowledgeBaseEN,
} from "@/utils/data/chatKnowledgeBaseEN";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .trim();
}

// Tokenizar
function tokenize(text: string): string[] {
  return normalizeText(text).split(/\s+/);
}

function calculateSimilarity(tokens1: string[], tokens2: string[]): number {
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  // Jaccard similarity
  return intersection.size / union.size;
}

// Detect question intent based on keywords and similarity
function detectIntent(question: string, locale: "es" | "en" = "es"): string | null {
  const questionTokens = tokenize(question);

  const knowledgeBase = locale === "es" ? knowledgeBaseES : knowledgeBaseEN;
  const greetings = locale === "es" ? greetingsES : greetingsEN;
  const farewells = locale === "es" ? farewellsES : farewellsEN;

  let bestMatch: { category: string; score: number } = {
    category: "",
    score: 0,
  };

  if (greetings.keywords.some((keyword) => normalizeText(question).includes(keyword))) {
    return "greeting";
  }

  if (farewells.keywords.some((keyword) => normalizeText(question).includes(keyword))) {
    return "farewell";
  }

  // Check each category in knowledge base
  for (const [category, data] of Object.entries(knowledgeBase)) {
    const categoryKeywords = data.keywords;

    // Calculate keyword matches
    const matchCount = categoryKeywords.filter((keyword: string) =>
      normalizeText(question).includes(normalizeText(keyword))
    ).length;

    // Calculate similarity with keywords
    const keywordTokens = categoryKeywords.flatMap((k: string) => tokenize(k));
    const similarity = calculateSimilarity(questionTokens, keywordTokens);

    // Score based on matches and similarity
    const score = matchCount * 2 + similarity;

    if (score > bestMatch.score) {
      bestMatch = { category, score };
    }
  }

  return bestMatch.score > 0.3 ? bestMatch.category : null;
}

export function getChatResponse(question: string, locale: "es" | "en" = "es"): ChatResponse {
  const intent = detectIntent(question, locale);

  const knowledgeBase = locale === "es" ? knowledgeBaseES : knowledgeBaseEN;
  const greetings = locale === "es" ? greetingsES : greetingsEN;
  const farewells = locale === "es" ? farewellsES : farewellsEN;
  const defaultResponses = locale === "es" ? defaultResponsesES : defaultResponsesEN;

  if (intent === "greeting") {
    return {
      answer: greetings.responses[0],
      followUp:
        locale === "es"
          ? ["¿Qué experiencia tienes?", "¿Qué tecnologías dominas?", "¿Qué proyectos has hecho?"]
          : [
              "What experience do you have?",
              "What technologies do you master?",
              "What projects have you done?",
            ],
    };
  }

  if (intent === "farewell") {
    const randomFarewell =
      farewells.responses[Math.floor(Math.random() * farewells.responses.length)];
    return { answer: randomFarewell };
  }

  if (intent && knowledgeBase[intent as keyof typeof knowledgeBase]) {
    const category = knowledgeBase[intent as keyof typeof knowledgeBase];
    const response = category.responses[0];
    return response;
  }

  const randomDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  return {
    answer: randomDefault,
    followUp:
      locale === "es"
        ? ["¿Qué tecnologías usas?", "¿Dónde has trabajado?", "¿Qué proyectos has hecho?"]
        : [
            "What technologies do you use?",
            "Where have you worked?",
            "What projects have you done?",
          ],
  };
}

export function getContextualSuggestions(
  previousQuestions: string[],
  locale: "es" | "en" = "es"
): string[] {
  const suggestionsES = [
    "¿Qué tecnologías dominas?",
    "¿Dónde has trabajado?",
    "¿Qué proyectos has hecho?",
    "¿Tienes experiencia en backend?",
    "¿Haces testing?",
    "¿Trabajas en remoto?",
    "¿Qué te motiva?",
    "¿Cómo puedo contactarte?",
  ];

  const suggestionsEN = [
    "What technologies do you master?",
    "Where have you worked?",
    "What projects have you done?",
    "Do you have backend experience?",
    "Do you do testing?",
    "Do you work remotely?",
    "What motivates you?",
    "How can I contact you?",
  ];

  const suggestions = locale === "es" ? suggestionsES : suggestionsEN;

  return suggestions.filter((_, index) => {
    return index < 3;
  });
}

export function isQuestionAbout(question: string, topic: string): boolean {
  const normalizedQuestion = normalizeText(question);
  const normalizedTopic = normalizeText(topic);
  return normalizedQuestion.includes(normalizedTopic);
}

export function extractKeywords(question: string): string[] {
  const stopWords = [
    "el",
    "la",
    "de",
    "que",
    "y",
    "a",
    "en",
    "un",
    "ser",
    "se",
    "no",
    "haber",
    "por",
    "con",
    "su",
    "para",
    "como",
    "estar",
    "tener",
    "le",
    "lo",
    "todo",
    "pero",
    "mas",
    "hacer",
    "o",
    "poder",
    "decir",
    "este",
    "ir",
    "otro",
    "ese",
    "the",
    "is",
    "are",
    "what",
    "how",
    "why",
    "when",
    "where",
    "who",
  ];

  const tokens = tokenize(question);
  return tokens.filter((token) => !stopWords.includes(token) && token.length > 2);
}

export function isValidQuestion(question: string): boolean {
  const trimmed = question.trim();
  return trimmed.length >= 3 && trimmed.length <= 500;
}

export function calculateTypingDelay(answer: string): number {
  const wordsPerMinute = 300;
  const words = answer.split(/\s+/).length;
  const baseDelay = (words / wordsPerMinute) * 60 * 1000;

  return Math.min(Math.max(baseDelay, 500), 2500);
}
