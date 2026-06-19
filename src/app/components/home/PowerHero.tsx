"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { Code2, Cpu, Download, Mail, Sparkles, Terminal, Zap } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";

import { cvService } from "../../services/cvService";

import NodeGraphBackground from "./NodeGraphBackground";

import "./PowerHero.scss";

const TECH_STACK = [
  { name: "REACT", context: "Incentro · Innova-tsn · AMS Solutions" },
  { name: "TYPESCRIPT", context: "AMS Solutions" },
  { name: "JAVA · SPRING BOOT", context: "AMS Solutions (Inditex)" },
  { name: "NODE.JS", context: "Compras App · homelab" },
  { name: "CSS / SCSS", context: "Incentro · AMS Solutions" },
] as const;

const TERMINAL_COMMANDS = [
  "whoami",
  "git log --oneline -3",
  "docker compose up -d",
  "ssh homelab",
  "npm run build",
] as const;

export default function PowerHero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "es" | "en";
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { open: openContactModal } = useContactModalStore();

  // Terminal typing effect
  useEffect(() => {
    const currentCommand = TERMINAL_COMMANDS[currentCommandIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedCommand("");

    const typingInterval = setInterval(() => {
      if (charIndex < currentCommand.length) {
        setDisplayedCommand(currentCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);

        // Wait 2 seconds then move to next command
        setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentCommandIndex]);

  // Handle CV download
  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      await cvService.downloadCV(locale);
    } catch (error) {
      console.error("Error downloading CV:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="power-hero">
      {/* Animated Background */}
      <div className="tech-background">
        <div className="grid-overlay" />
        <div className="gradient-orb" />
        <NodeGraphBackground />
      </div>

      <motion.div className="hero-container">
        {/* Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="tech-badge"
        >
          <Cpu size={16} />
          <span>{t("title")}</span>
          <motion.div
            className="badge-glow"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="home-terminal-header"
        >
          <Terminal className="terminal-icon" />
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">{displayedCommand}</span>
            <motion.span
              className="cursor"
              animate={{ opacity: isTyping ? [1, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
            >
              ▊
            </motion.span>
          </div>
        </motion.div>

        {/* Name with Glitch Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="main-name"
          onMouseEnter={() => setIsGlitching(true)}
          onMouseLeave={() => setIsGlitching(false)}
        >
          <span className={`name-first ${isGlitching ? "glitch" : ""}`} data-text="JAVIER">
            JAVIER
          </span>
          <span className={`name-last ${isGlitching ? "glitch" : ""}`} data-text="GARCÍA">
            GARCÍA
          </span>{" "}
          <span className={`name-last ${isGlitching ? "glitch" : ""}`} data-text="MAGALDI">
            MAGALDI
          </span>
        </motion.h1>

        {/* Specialization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="value-proposition"
        >
          {t("d1")} <span className="highlight">{t("d2")}</span> {t("d3")}{" "}
          <span className="code">{t("d4")}</span> {t("d5")}{" "}
          <span className="highlight">{t("d6")}</span>.
        </motion.p>

        {/* Tech Stack — clean chips, real stack, context on hover via title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="quick-stack"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.span
              key={tech.name}
              className="stack-chip"
              title={`${t("usedAt")} ${tech.context}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.05 }}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="hero-actions"
        >
          <motion.a
            href="#proyectos"
            className="primary-action"
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(111, 0, 255, 0.45)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} />
            <span>{t("seeProjects")}</span>
          </motion.a>

          <motion.button
            onClick={() => openContactModal()}
            className="cta-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
            <span>{t("ctaPrimary")}</span>
          </motion.button>

          <motion.button
            onClick={handleDownloadCV}
            className="tertiary-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isDownloading}
          >
            <Download size={18} />
            <span>{isDownloading ? t("downloadingCv") : t("downloadCv")}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
