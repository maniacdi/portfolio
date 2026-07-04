"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { motion } from "framer-motion";

// next-intl navigation Link + usePathname — REQUIRED for locale switching.
// Plain next/link only soft-navigates and never reloads the server locale,
// so the switcher appeared to "do nothing".
import { Link, usePathname } from "@/i18n/navigation";

import "./LanguageSwitcher.scss";

export default function LanguageSwitcher() {
  const locale = useLocale();
  // next-intl usePathname returns the pathname WITHOUT locale prefix
  // (e.g. "/about" on both /about and /en/about).
  const pathname = usePathname();

  const isEnglish = locale === "en";
  const nextLocale = isEnglish ? "es" : "en";

  const languageLabels = {
    en: "English",
    es: "Español",
  };

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={`lang-switcher ${isEnglish ? "en" : "es"}`}
      aria-label={`Change language to ${languageLabels[nextLocale]}`}
      title={`Switch to ${languageLabels[nextLocale]}`}
    >
      <div className="track">
        <div className="flags-container">
          <div className="flag flag-en" aria-hidden="true">
            <Image src="/flags/en.svg" width={16} height={16} alt="" priority />
          </div>
          <div className="flag flag-es" aria-hidden="true">
            <Image src="/flags/es.svg" width={16} height={16} alt="" priority />
          </div>
        </div>

        <motion.div
          className="selection-bubble"
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
