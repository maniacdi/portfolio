"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, CheckCircle, Loader2, Mail, MessageSquare, Send, User, X } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";

import PrivacyConsentField from "./PrivacyConsentField";

import "./ContactModal.scss";

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

const SERVICE_KEYS = ["web", "shop", "mobile", "custom"] as const;

export default function ContactModal() {
  const t = useTranslations("contactForm");
  const ts = useTranslations("services");
  const serviceLabel = (key: string) =>
    key === "employee" ? ts("employeeLabel") : ts(`items.${key}.title`);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "", service: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { isOpen, close, selectedService } = useContactModalStore();

  // Prefill the service when the modal is opened from a Services card
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [isOpen, selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

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
      if (e.target === backdropRef.current) close();
    },
    [close]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Belt and braces: the checkbox is `required`, but never send personal data
    // without consent if the native validation is bypassed.
    if (!privacyAccepted) return;

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
          service: form.service ? serviceLabel(form.service) : "—",
          // Record of consent (RGPD art. 7.1) travels with the submission.
          privacy_accepted: "yes",
          subject: `Portfolio Contact — ${form.name}${
            form.service ? ` (${serviceLabel(form.service)})` : ""
          }`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", service: "" });
        setPrivacyAccepted(false);
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
    close();
    // Reset after animation
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "", service: "" });
      setPrivacyAccepted(false);
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
              <button className="modal-close" onClick={close} aria-label="Close">
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

                  <div className="form-group">
                    <label htmlFor="modal-service">
                      <Briefcase size={13} />
                      <span>{t("serviceLabel")}</span>
                    </label>
                    <select
                      id="modal-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="service-select"
                    >
                      <option value="">{t("servicePlaceholder")}</option>
                      {SERVICE_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {ts(`items.${key}.title`)}
                        </option>
                      ))}
                      <option value="employee">{ts("employeeLabel")}</option>
                    </select>
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

                  {/* Privacy consent — RGPD art. 13 first layer + art. 6.1.a */}
                  <PrivacyConsentField
                    id="modal-privacy"
                    checked={privacyAccepted}
                    onChange={setPrivacyAccepted}
                  />

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
