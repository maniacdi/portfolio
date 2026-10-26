"use client";

import { useTranslations } from "next-intl";

import "./ContactFields.scss";

// Shared by ContactForm (page) and ContactModal so both read the same.

export const SERVICE_KEYS = ["web", "shop", "mobile", "custom", "employee"] as const;

interface FloatingFieldProps {
  id: string;
  name: string;
  label: string;
  /** Hint shown once the field is focused and still empty. */
  hint: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "email";
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
  className?: string;
}

/**
 * Input whose label sits inside as a placeholder and moves up onto the
 * border when focused or filled. Pure CSS (:placeholder-shown), so the
 * label must come after the control in the DOM.
 */
export function FloatingField({
  id,
  name,
  label,
  hint,
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 4,
  autoComplete,
  className,
}: FloatingFieldProps) {
  const shared = { id, name, value, onChange, required: true, placeholder: hint };

  return (
    <div className={`float-field${className ? ` ${className}` : ""}`}>
      {multiline ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/** Optional service picker: one click to choose, click again to clear. */
export function ServiceChips({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (service: string) => void;
  className?: string;
}) {
  const t = useTranslations("contactForm");
  const ts = useTranslations("services");

  return (
    <fieldset className={`service-chips${className ? ` ${className}` : ""}`}>
      <legend>{t("servicePlaceholder")}</legend>
      <div className="service-chips__list">
        {SERVICE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="service-chip"
            aria-pressed={value === key}
            onClick={() => onChange(value === key ? "" : key)}
          >
            {key === "employee" ? ts("employeeLabel") : ts(`items.${key}.title`)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
