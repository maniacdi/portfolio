"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { CheckCircle, Loader2, Mail, Send } from "lucide-react";

import { FloatingField, ServiceChips } from "./ContactFields";
import PrivacyConsentField from "./PrivacyConsentField";

import "./ContactForm.scss";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

interface ContactFormProps {
  /** Service preselected in the chips (service landing pages). */
  defaultService?: string;
  /** Heading and intro overrides; default to the generic contact copy. */
  title?: string;
  subtitle?: string;
}

export default function ContactForm({ defaultService = "", title, subtitle }: ContactFormProps) {
  const t = useTranslations("contactForm");
  const ts = useTranslations("services");
  const serviceLabel = (key: string) =>
    key === "employee" ? ts("employeeLabel") : ts(`items.${key}.title`);
  const emptyForm: FormData = { name: "", email: "", message: "", service: defaultService };
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          access_key: WEB3FORMS_KEY,
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
        setForm(emptyForm);
        setPrivacyAccepted(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contacto" className="contact-form-section">
        <motion.div
          className="success-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <CheckCircle size={48} className="success-icon" />
          <h3>{t("successTitle")}</h3>
          <p>{t("successMessage")}</p>
          <button className="reset-btn" onClick={() => setStatus("idle")}>
            {t("sendAnother")}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contacto" className="contact-form-section">
      {/* Label */}
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Mail size={14} />
        <span>{t("label")}</span>
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title ?? t("title")}
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subtitle ?? t("subtitle")}
      </motion.p>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <FloatingField
          id="cf-name"
          name="name"
          label={t("nameLabel")}
          hint={t("namePlaceholder")}
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <FloatingField
          id="cf-email"
          name="email"
          type="email"
          label={t("emailLabel")}
          hint={t("emailPlaceholder")}
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <ServiceChips
          className="full-width"
          value={form.service}
          onChange={(service) => setForm((prev) => ({ ...prev, service }))}
        />
        <FloatingField
          id="cf-message"
          name="message"
          className="full-width"
          label={t("messageLabel")}
          hint={t("messagePlaceholder")}
          value={form.message}
          onChange={handleChange}
          multiline
          rows={5}
        />

        {/* Privacy consent — RGPD art. 13 first layer + art. 6.1.a */}
        <PrivacyConsentField
          id="cf-privacy"
          checked={privacyAccepted}
          onChange={setPrivacyAccepted}
        />

        {/* Error */}
        {status === "error" && (
          <motion.p
            className="form-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t("errorMessage")}
          </motion.p>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          className="submit-btn"
          disabled={status === "sending"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
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
        </motion.button>
      </motion.form>
    </section>
  );
}