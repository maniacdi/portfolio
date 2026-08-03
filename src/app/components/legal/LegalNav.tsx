"use client";

import { useTranslations } from "next-intl";

import LocalizedLink from "../common/LocalizedLink";

import CookiePreferencesButton from "./CookiePreferencesButton";

/** Cross-links between the three legal documents, plus consent withdrawal. */
export default function LegalNav({ current }: { current: "privacy" | "cookies" | "notice" }) {
  const t = useTranslations("legal");

  const links = [
    { key: "notice" as const, href: "/legal", label: t("notice") },
    { key: "privacy" as const, href: "/privacy", label: t("privacy") },
    { key: "cookies" as const, href: "/cookies", label: t("cookies") },
  ];

  return (
    <nav className="legal-nav" aria-label={t("navLabel")}>
      {links
        .filter((link) => link.key !== current)
        .map((link) => (
          <LocalizedLink key={link.key} href={link.href}>
            {link.label}
          </LocalizedLink>
        ))}
      <CookiePreferencesButton />
    </nav>
  );
}
