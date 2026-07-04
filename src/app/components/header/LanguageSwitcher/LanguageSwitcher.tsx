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

  // Remove locale from pathname and build new URL
  const getNewUrl = () => {
    // En español, pathname NO tiene prefijo: /about, /projects, /
    // En inglés, pathname SÍ tiene prefijo: /en/about, /en/projects, /en
    if (isEnglish) {
      // Quitar /en del principio para obtener la ruta base
      const basePath = pathname.replace(/^\/en/, "") || "/";
      return basePath; // español no lleva prefijo
    } else {
      // Añadir /en al principio
      return `/en${pathname === "/" ? "" : pathname}`;
    }
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
