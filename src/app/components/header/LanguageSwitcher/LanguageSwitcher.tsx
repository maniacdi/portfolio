"use client";

import { useLocale } from "next-intl";

// next-intl navigation Link + usePathname — REQUIRED for locale switching.
// Plain next/link only soft-navigates and never reloads the server locale,
// so the switcher appeared to "do nothing".
import { Link, usePathname } from "@/i18n/navigation";

import "./LanguageSwitcher.scss";

const LANGUAGE_LABELS = {
  en: "English",
  es: "Español",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  // next-intl usePathname returns the pathname WITHOUT locale prefix
  // (e.g. "/about" on both /about and /en/about).
  const pathname = usePathname();

  const isEnglish = locale === "en";
  const nextLocale = isEnglish ? "es" : "en";

  // Plain "ES / EN" in mono, current one lit: same box as the theme toggle.
  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="lang-switcher"
      aria-label={`Change language to ${LANGUAGE_LABELS[nextLocale]}`}
      title={`Switch to ${LANGUAGE_LABELS[nextLocale]}`}
    >
      <span className={isEnglish ? undefined : "active"}>ES</span>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <span className={isEnglish ? "active" : undefined}>EN</span>
    </Link>
  );
}
