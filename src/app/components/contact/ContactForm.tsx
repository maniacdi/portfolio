"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Loader2, Mail, MessageSquare, Send, User } from "lucide-react";

import "./ContactForm.scss";


const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const SERVICE_KEYS = ["web", "shop", "mobile", "custom"] as const;

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
}

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const ts = useTranslations("services");
  const serviceLabel = (key: string) =>
    key === "employee" ? ts("employeeLabel") : ts(`items.${key}.title`);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "", service: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          subject: `Portfolio Contact — ${form.name}${
            form.service ? ` (${serviceLabel(form.service)})` : ""
          }`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", service: "" });
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
        {t("title")}
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("subtitle")}
      </motion.p>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Name */}
        <div className={`form-group ${focusedField === "name" ? "focused" : ""}`}>
          <label htmlFor="cf-name">
            <User size={14} />
            <span>{t("nameLabel")}</span>
          </label>
          <input
            id="cf-name"
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

        {/* Email */}
        <div className={`form-group ${focusedField === "email" ? "focused" : ""}`}>
          <label htmlFor="cf-email">
            <Mail size={14} />
            <span>{t("emailLabel")}</span>
          </label>
          <input
            id="cf-email"
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

        {/* Service */}
        <div className="form-group">
          <label htmlFor="cf-service">
            <Briefcase size={14} />
            <span>{t("serviceLabel")}</span>
          </label>
          <select
            id="cf-service"
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

        {/* Message */}
        <div className={`form-group full-width ${focusedField === "message" ? "focused" : ""}`}>
          <label htmlFor="cf-message">
            <MessageSquare size={14} />
            <span>{t("messageLabel")}</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder={t("messagePlaceholder")}
          />
        </div>

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