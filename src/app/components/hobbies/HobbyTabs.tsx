"use client";

import { useState } from "react";
import { Sections } from "./Sections";
import { sectionsData } from "@/utils/data";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import "./HobbyTabs.scss";

export default function HobbyTabs() {
  const [active, setActive] = useState<string>("anime");
  const t = useTranslations("hobbies.categories");

  const translatedSections = sectionsData.map((section) => ({
    ...section,
    title: t(section.id),
  }));

  return (
    <div className="hobbies-container">
      {/* Tabs */}
      <div className="hobbies-tabs">
        {translatedSections.map((section) => (
          <motion.button
            key={section.id}
            className={`tab-btn ${active === section.id ? "active" : ""}`}
            onClick={() => setActive(section.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {section.title}
            {active === section.id && (
              <motion.div
                className="tab-indicator"
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Contenido */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Sections section={translatedSections.find((s) => s.id === active)!} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
