"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, Mail, MessageSquare, Send, User, X } from "lucide-react";

import "./ContactModal.scss";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations("contactForm");
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact — ${form.name}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
  };

  const handleCloseAfterSuccess = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="contact-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <Mail size={18} className="modal-icon" />
                <h3>{t("title")}</h3>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {status === "success" ? (
                <motion.div
                  className="modal-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={44} className="success-icon" />
                  <h4>{t("successTitle")}</h4>
                  <p>{t("successMessage")}</p>
                  <div className="success-actions">
                    <button className="btn-secondary" onClick={handleReset}>
                      {t("sendAnother")}
                    </button>
                    <button className="btn-primary" onClick={handleCloseAfterSuccess}>
                      {t("close") || "Cerrar"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form className="modal-form" onSubmit={handleSubmit}>
                  <p className="modal-subtitle">{t("subtitle")}</p>

                  <div className={`form-group ${focusedField === "name" ? "focused" : ""}`}>
                    <label htmlFor="modal-name">
                      <User size={13} />
                      <span>{t("nameLabel")}</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("namePlaceholder")}
                      autoComplete="name"
                    />
                  </div>

                  <div className={`form-group ${focusedField === "email" ? "focused" : ""}`}>
                    <label htmlFor="modal-email">
                      <Mail size={13} />
                      <span>{t("emailLabel")}</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("emailPlaceholder")}
                      autoComplete="email"
                    />
                  </div>

                  <div className={`form-group ${focusedField === "message" ? "focused" : ""}`}>
                    <label htmlFor="modal-message">
                      <MessageSquare size={13} />
                      <span>{t("messageLabel")}</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>

                  {status === "error" && (
                    <motion.p
                      className="form-error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {t("errorMessage")}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="spin" />
                        <span>{t("sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{t("send")}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
