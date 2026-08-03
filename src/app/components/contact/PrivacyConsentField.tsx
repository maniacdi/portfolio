"use client";

import { useTranslations } from "next-intl";

import LocalizedLink from "../common/LocalizedLink";

import "./PrivacyConsentField.scss";

/**
 * Consent checkbox + first-layer information notice (RGPD art. 13).
 *
 * Unticked by default — pre-ticked boxes are not valid consent — and required,
 * so the form cannot be submitted without it. The full policy opens in a new
 * tab so a half-written message is not lost.
 */
export default function PrivacyConsentField({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const t = useTranslations("contactForm");

  return (
    <div className="privacy-consent">
      <label htmlFor={id} className="privacy-consent__label">
        <input
          id={id}
          type="checkbox"
          name="privacy"
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>
          {t.rich("privacyConsent", {
            link: (chunks) => (
              <LocalizedLink href="/privacy" target="_blank" rel="noopener noreferrer">
                {chunks}
              </LocalizedLink>
            ),
          })}
        </span>
      </label>

      <p className="privacy-consent__basic">{t("privacyBasic")}</p>
    </div>
  );
}
