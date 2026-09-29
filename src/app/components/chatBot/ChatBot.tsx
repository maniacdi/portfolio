"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocale, useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Maximize2, MessageCircle, Minimize2, Send, Sparkles, User, X } from "lucide-react";

import { calculateTypingDelay, getChatResponse, isValidQuestion } from "@/app/services/chatEngine";
import { useChatbotStore } from "@/app/store/useChatbotStore";

import LocalizedLink from "../common/LocalizedLink";

import "./ChatBot.scss";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  followUp?: string[];
}

// Lo que el modelo puede usar al responder: texto con énfasis, listas y enlaces.
// Encabezados, imágenes o tablas se desenvuelven a texto.
const BOT_MARKDOWN_ELEMENTS = ["p", "strong", "em", "ul", "ol", "li", "a", "code", "br"];

function parseFollowUp(header: string | null): string[] | undefined {
  if (!header) return undefined;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(header));
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : undefined;
  } catch {
    return undefined;
  }
}

export default function ChatBot() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("chatbot");
  const { isOpen, open, close } = useChatbotStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Cerrar el chat corta la respuesta en curso.
  useEffect(() => {
    if (!isOpen) abortRef.current?.abort();
  }, [isOpen]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage =
          locale === "es"
            ? "¡Hola! 👋 Soy el asistente IA de Javi. Puedo contarte cómo trabaja, sus proyectos y cómo contratarle — para tu negocio como freelance o en plantilla. ¿Qué te gustaría saber?"
            : "Hello! 👋 I'm Javi's AI assistant. I can tell you how he works, his projects, and how to hire him — freelance for your business or full-time. What would you like to know?";

        const followUpSuggestions =
          locale === "es"
            ? [
                "¿Cómo puedo contratarte?",
                "¿Puedes ayudarme con mi proyecto?",
                "¿Estás disponible para trabajar en plantilla?",
              ]
            : [
                "How can I hire you?",
                "Can you help with my project?",
                "Are you open to a full-time role?",
              ];

        addBotMessage(welcomeMessage, followUpSuggestions);
      }, 500);
    }
  }, [isOpen, locale]);

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addBotMessage = (content: string, followUp?: string[]) => {
    const newMessage: Message = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content,
      timestamp: new Date(),
      followUp,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateBotMessage = (id: string, patch: Partial<Message>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const handleSendMessage = async (override?: string) => {
    const trimmedInput = (override ?? inputValue).trim();

    if (isTyping || !trimmedInput || !isValidQuestion(trimmedInput)) {
      return;
    }

    addUserMessage(trimmedInput);
    setInputValue("");
    setIsTyping(true);

    const controller = new AbortController();
    abortRef.current = controller;
    // Id del mensaje que se va rellenando; solo existe desde el primer trozo.
    let streamingId: string | null = null;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmedInput,
          locale,
          history: messages.slice(-6).map((m) => ({
            type: m.type,
            content: m.content,
          })),
        }),
      });

      // Si la API falla (429, 502, 503...), fallback al engine local
      if (!response.ok || !response.body) throw new Error("API unavailable");

      const followUp = parseFollowUp(response.headers.get("X-Chat-Follow-Up"));
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += value;

        if (!streamingId) {
          streamingId = `bot-${Date.now()}`;
          const id = streamingId;
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id, type: "bot", content: answer, timestamp: new Date() },
          ]);
        } else {
          updateBotMessage(streamingId, { content: answer });
        }
      }

      if (!streamingId) throw new Error("Empty answer");
      updateBotMessage(streamingId, { followUp });
      setIsTyping(false);
    } catch {
      // Chat cerrado a media respuesta: no hay nada que rellenar.
      if (controller.signal.aborted) return;

      // Cortado a medias: se queda lo que llegó, sin mezclarlo con otra respuesta.
      if (streamingId) {
        setIsTyping(false);
        return;
      }

      // Fallback: usar el engine local de keyword matching
      const localResponse = getChatResponse(trimmedInput, locale);
      const typingDelay = calculateTypingDelay(localResponse.answer);

      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(localResponse.answer, localResponse.followUp);
      }, typingDelay);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-trigger"
            onClick={open}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.5 }}
            aria-label={t("openChat")}
          >
            <MessageCircle size={24} />
            <span className="trigger-label">{t("triggerLabel")}</span>
            <span className="trigger-badge">
              <Sparkles size={12} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window ${isExpanded ? "expanded" : ""}`}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="chatbot-header">
              <div className="header-content">
                <div className="header-avatar">
                  <Bot size={24} />
                </div>
                <div className="header-info">
                  <h3>{t("title")}</h3>
                  <p className="status">
                    <span className="status-dot"></span>
                    {t("online")}
                  </p>
                </div>
              </div>
              <div className="header-buttons">
                <button
                  className="expand-button"
                  onClick={() => setIsExpanded((p) => !p)}
                  aria-label={isExpanded ? t("minimize") : t("maximize")}
                >
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button className="close-button" onClick={close} aria-label={t("close")}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.type === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="message-content">
                    {message.type === "bot" ? (
                      <div className="message-markdown">
                        <ReactMarkdown
                          allowedElements={BOT_MARKDOWN_ELEMENTS}
                          unwrapDisallowed
                          components={{
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}

                    {message.followUp && message.followUp.length > 0 && (
                      <div className="followup-suggestions">
                        {message.followUp.map((suggestion, index) => (
                          <button
                            key={index}
                            className="suggestion-chip"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="message bot typing-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
              <input
                ref={inputRef}
                type="text"
                placeholder={t("placeholder")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                maxLength={500}
              />
              <button
                className="send-button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                aria-label={t("send")}
              >
                <Send size={18} />
              </button>
            </div>

            {/* The prompt is sent to a third-party model (Groq, USA): say so
                where the user types, not only in the privacy policy. */}
            <p className="chatbot-disclaimer">
              {t.rich("disclaimer", {
                link: (chunks) => (
                  <LocalizedLink href="/privacy" target="_blank" rel="noopener noreferrer">
                    {chunks}
                  </LocalizedLink>
                ),
              })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
