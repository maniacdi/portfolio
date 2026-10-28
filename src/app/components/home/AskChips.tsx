"use client";

import { useChatbotStore } from "@/app/store/useChatbotStore";

// Opens the chatbot and sends the chosen question after its welcome message.
export default function AskChips({ questions }: { questions: string[] }) {
  const open = useChatbotStore((s) => s.open);

  return (
    <div className="ask-chips">
      {questions.map((question) => (
        <button key={question} type="button" className="ask-chip" onClick={() => open(question)}>
          {question}
        </button>
      ))}
    </div>
  );
}
