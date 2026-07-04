"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { motion } from "framer-motion";

import "./LanguageSwitcher.scss";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const isEnglish = locale === "en";
  const nextLocale = isEnglish ? "es" : "en";

  // Build the target URL for the OTHER locale.
  // localePrefix "as-needed": es (default) has no prefix, en → /en.
  // Strip whatever locale prefix the pathname currently carries, then re-add
  // the target's. Defensive against both /en/* and (transient) /es/* paths.
  const getNewUrl = () => {
    const basePath = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

    if (nextLocale === "en") {
      return `/en${basePath === "/" ? "" : basePath}`;
    }
    return basePath; // Spanish carries no prefix
  };

  const newUrl = getNewUrl();

  const languageLabels = {
    en: "English",
    es: "Español",
  };

  return (
    <Link
      href={newUrl}
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
