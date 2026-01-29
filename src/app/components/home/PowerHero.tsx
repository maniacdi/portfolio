"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Terminal, Code2, Cpu, Zap, Sparkles } from "lucide-react";
import "./PowerHero.scss";

const TECH_STACK = [
  { name: "REACT", level: 95 },
  { name: "NODE.JS", level: 80 },
  { name: "TYPESCRIPT", level: 92 },
  { name: "CSS", level: 88 },
  { name: "VUE", level: 70 },
] as const;

export default function PowerHero() {
  const t = useTranslations("hero");

  return (
    <section className="power-hero">
      <div className="tech-background">
        <div className="grid-overlay" />
        <div className="gradient-orb" />
      </div>

      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="tech-badge"
        >
          <Cpu size={16} />
          <span>{t("title")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="home-terminal-header"
        >
          <Terminal className="terminal-icon" />
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">whoami</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="main-name"
        >
          <span className="name-first">JAVIER</span>
          <span className="name-last">GARCÍA</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="specialization"
        >
          <div className="specialization-line">
            <Code2 className="icon" />
            <span className="tech-text">{t("subtitle")}</span>
          </div>
          <div className="specialization-line">
            <Zap className="icon" />
            <span className="tech-text">{t("description")}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="value-proposition"
        >
          {t("d1")} <span className="highlight">{t("d2")}</span> {t("d3")}{" "}
          <span className="code">{t("d4")}</span> {t("d5")}{" "}
          <span className="highlight">{t("d6")}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="quick-stack"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="stack-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <span className="stack-name">{tech.name}</span>
              <div className="stack-bar">
                <motion.div
                  className="stack-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-actions"
        >
          <a
            href="mailto:magaldi6@gmail.com"
            className="secondary-action"
            aria-label="Contact via email"
          >
            <span>{t("ctaPrimary")}</span>
            <Sparkles className="sparkle-icon" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
