"use client";

import { useTranslations } from "next-intl";

import { useConsentStore } from "../../store/useConsentStore";

/**
 * Reopens the consent panel. Consent has to be as easy to withdraw as it was
 * to give (RGPD art. 7.3), so this entry point lives in the footer of every
 * page and at the bottom of each legal document.
 */
export default function CookiePreferencesButton({ className }: { className?: string }) {
  const t = useTranslations("legal");
  const openPanel = useConsentStore((s) => s.openPanel);

  return (
    <button type="button" className={className} onClick={openPanel}>
      {t("cookiePrefs")}
    </button>
  );
}
