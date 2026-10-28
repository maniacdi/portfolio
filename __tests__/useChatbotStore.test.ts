import { beforeEach, describe, expect, it } from "vitest";

import { useChatbotStore } from "@/app/store/useChatbotStore";

describe("useChatbotStore pending question", () => {
  beforeEach(() => {
    useChatbotStore.setState({ isOpen: false, pendingQuestion: null });
  });

  it("opens with a question to send", () => {
    useChatbotStore.getState().open("hola");
    expect(useChatbotStore.getState().isOpen).toBe(true);
    expect(useChatbotStore.getState().pendingQuestion).toBe("hola");
  });

  it("hands the question over once", () => {
    useChatbotStore.getState().open("hola");
    expect(useChatbotStore.getState().consumePendingQuestion()).toBe("hola");
    expect(useChatbotStore.getState().pendingQuestion).toBeNull();
  });

  it("opens without a question", () => {
    useChatbotStore.getState().open();
    expect(useChatbotStore.getState().isOpen).toBe(true);
    expect(useChatbotStore.getState().pendingQuestion).toBeNull();
  });
});
