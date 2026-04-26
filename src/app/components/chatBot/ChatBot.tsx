"use client";

import { useEffect,useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { AnimatePresence,motion } from "framer-motion";
import { Bot,MessageCircle, Send, Sparkles, User, X } from "lucide-react";

import { calculateTypingDelay, getChatResponse, isValidQuestion } from "@/app/services/chatEngine";

import "./ChatBot.scss";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  followUp?: string[];
}

export default function ChatBot() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("chatbot");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
            ? "¡Hola! 👋 Soy el Lacayo de Javi. Puedo responder preguntas sobre su experiencia, proyectos, stack tecnológico y mucho más. ¿Qué te gustaría saber?"
            : "Hello! 👋 I'm Javi's Minion. I can answer questions about his experience, projects, tech stack, and much more. What would you like to know?";

        const followUpSuggestions =
          locale === "es"
            ? ["¿Qué tecnologías dominas?", "¿Dónde has trabajado?", "¿Qué proyectos has hecho?"]
            : [
                "What technologies do you master?",
                "Where have you worked?",
                "What projects have you done?",
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

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || !isValidQuestion(trimmedInput)) {
      return;
    }

    addUserMessage(trimmedInput);
    setInputValue("");

    setIsTyping(true);

    const response = getChatResponse(trimmedInput, locale);
    const typingDelay = calculateTypingDelay(response.answer);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(response.answer, response.followUp);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-trigger"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.5 }}
            aria-label={t("openChat")}
          >
            <MessageCircle size={24} />
            <span className="trigger-badge">
              <Sparkles size={12} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
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
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
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
                    <p>{message.content}</p>

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
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                aria-label={t("send")}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
