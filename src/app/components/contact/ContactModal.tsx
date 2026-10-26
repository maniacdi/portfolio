"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, Mail, Send, X } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";

import { FloatingField, ServiceChips } from "./ContactFields";
import PrivacyConsentField from "./PrivacyConsentField";

import "./ContactModal.scss";

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export default function ContactModal() {
  const t = useTranslations("contactForm");
  const ts = useTranslations("services");
  const serviceLabel = (key: string) =>
    key === "employee" ? ts("employeeLabel") : ts(`items.${key}.title`);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "", service: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { isOpen, close, selectedService } = useContactModalStore();

  // Prefill the service when the modal is opened from a Services card
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [isOpen, selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Close on ESC and keep Tab inside the dialog; focus goes back to
  // whatever opened it on close.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input, textarea"
        ) ?? []
      );
    // Wait for the enter animation to mount the form
    const focusTimer = setTimeout(() => {
      (dialogRef.current?.querySelector<HTMLElement>("input") ?? focusables()[0])?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <Mail size={18} className="modal-icon" />
                <h3 id="contact-modal-title">{t("title")}</h3>
              </div>
              <button className="modal-close" onClick={close} aria-label={t("close")}>
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

                  <FloatingField
                    id="modal-name"
                    name="name"
                    label={t("nameLabel")}
                    hint={t("namePlaceholder")}
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  <FloatingField
                    id="modal-email"
                    name="email"
                    type="email"
                    label={t("emailLabel")}
                    hint={t("emailPlaceholder")}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <ServiceChips
                    value={form.service}
                    onChange={(service) => setForm((prev) => ({ ...prev, service }))}
                  />
                  <FloatingField
                    id="modal-message"
                    name="message"
                    label={t("messageLabel")}
                    hint={t("messagePlaceholder")}
                    value={form.message}
                    onChange={handleChange}
                    multiline
                  />

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
