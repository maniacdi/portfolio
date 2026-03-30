"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

import "./LanguageSwitcher.scss";
import Link from "next/link";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isEnglish = locale === "en";
  const nextLocale = isEnglish ? "es" : "en";

  const languageLabels = { en: "English", es: "Español" };

  const getPathWithoutLocalePrefix = () => pathname.replace(/^\/en/, "") || "/";

  const handleSwitch = () => {
    const pathWithoutPrefix = getPathWithoutLocalePrefix();
    const newPath = nextLocale === "en" ? `/en${pathWithoutPrefix}` : pathWithoutPrefix;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    router.push(newPath);
  };

  return (
    <Link
      onClick={handleSwitch}
      className={`lang-switcher ${isEnglish ? "en" : "es"}`}
      aria-label={`Change language to ${languageLabels[nextLocale]}`}
      title={`Switch to ${languageLabels[nextLocale]}`}
      href={"#"}
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
          transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
