"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Terminal, Code2, Cpu, Zap, Sparkles, ArrowRight } from "lucide-react";
import "./PowerHero.scss";

export default function PowerHero() {
  const t = useTranslations("hero");

  return (
    <section className="power-hero">
      <div className="tech-background">
        <div className="grid-overlay"></div>
        <div className="gradient-orb"></div>
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
          <div className="stack-item">
            <span className="stack-name">REACT</span>
            <div className="stack-bar">
              <div className="stack-fill" style={{ width: "95%" }}></div>
            </div>
          </div>
          <div className="stack-item">
            <span className="stack-name">NODE.JS</span>
            <div className="stack-bar">
              <div className="stack-fill" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div className="stack-item">
            <span className="stack-name">TYPESCRIPT</span>
            <div className="stack-bar">
              <div className="stack-fill" style={{ width: "92%" }}></div>
            </div>
          </div>
          <div className="stack-item">
            <span className="stack-name">CSS</span>
            <div className="stack-bar">
              <div className="stack-fill" style={{ width: "88%" }}></div>
            </div>
          </div>
          <div className="stack-item">
            <span className="stack-name">VUE</span>
            <div className="stack-bar">
              <div className="stack-fill" style={{ width: "70%" }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-actions"
        >
          <a href="mailto:magaldi6@gmail.com" className="secondary-action">
            <span>{t("ctaPrimary")}</span>
            <Sparkles className="sparkle-icon" />
          </a>
        </motion.div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="scroll-indicator"
      >
        <div className="scroll-text">{t("explore")}</div>
        <div className="scroll-line"></div>
      </motion.div> */}
    </section>
  );
}
