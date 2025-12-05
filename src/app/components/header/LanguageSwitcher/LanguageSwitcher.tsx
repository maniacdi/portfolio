"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "./LanguageSwitcher.scss";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const isEnglish = locale === "en";
  const nextLocale = isEnglish ? "es" : "en";

  const newUrl = pathname.replace(`/${locale}`, `/${nextLocale}`);

  return (
    <Link href={newUrl} className={`lang-switcher ${isEnglish ? "en" : "es"}`}>
      <div className="track">
        <div className="flags-container">
          <div className="flag flag-en">
            <Image src="/flags/en.svg" width={16} height={16} alt="English" />
          </div>
          <div className="flag flag-es">
            <Image src="/flags/es.svg" width={16} height={16} alt="Español" />
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
        />
      </div>
    </Link>
  );
}
