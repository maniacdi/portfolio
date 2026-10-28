import { create } from "zustand";

interface ChatbotStore {
  isOpen: boolean;
  // Question to send as soon as the chat is ready (home "ask my AI" chips).
  pendingQuestion: string | null;
  open: (question?: string) => void;
  close: () => void;
  toggle: () => void;
  consumePendingQuestion: () => string | null;
}

export const useChatbotStore = create<ChatbotStore>((set, get) => ({
  isOpen: false,
  pendingQuestion: null,
  open: (question) => set({ isOpen: true, pendingQuestion: question ?? null }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  consumePendingQuestion: () => {
    const question = get().pendingQuestion;
    set({ pendingQuestion: null });
    return question;
  },
}));
