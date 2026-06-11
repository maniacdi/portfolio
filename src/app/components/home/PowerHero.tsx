"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Code2,
  Cpu,
  Download,
  Mail,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";

import { cvService } from "../../services/cvService";

import "./PowerHero.scss";

const MAX_YEARS = 5;

const TECH_STACK = [
  { name: "REACT", years: 5, context: "Incentro · Innova-tsn · AMS Solutions" },
  { name: "TYPESCRIPT", years: 5, context: "AMS Solutions" },
  { name: "JAVA · SPRING BOOT", years: 3, context: "AMS Solutions (Inditex)" },
  { name: "NODE.JS", years: 4, context: "Compras App · homelab" },
  { name: "CSS / SCSS", years: 5, context: "Incentro · AMS Solutions" },
] as const;

const TERMINAL_COMMANDS = [
  "whoami",
  "git log --oneline -3",
  "docker compose up -d",
  "ssh homelab",
  "npm run build",
] as const;

const STATS = [
  { value: 5, suffix: "+", label: "years", icon: Calendar },
  { value: 10, suffix: "K+", label: "dailyUsers", icon: Users },
  { value: 85, suffix: "%", label: "coverage", icon: ShieldCheck },
] as const;

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 61.8 + 7) % 100}%`,
  top: `${(i * 38.2 + 13) % 100}%`,
  drift: ((i * 17) % 50) - 25,
  duration: 3 + (i % 5) * 0.45,
  delay: (i % 4) * 0.5,
}));

export default function PowerHero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "es" | "en";
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
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

        {/* Floating particles */}
        <div className="particles">
          {PARTICLES.map((particle, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -100, 0],
                x: [0, particle.drift, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>
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

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="stats-grid"
        >
          {STATS.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.label)}
              Icon={stat.icon}
              delay={0.35 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Tech Stack — years of real experience, no made-up percentages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="quick-stack"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`stack-item ${hoveredTech === tech.name ? "hovered" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.07 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="stack-header">
                <span className="stack-name">{tech.name}</span>
                <span className="stack-years">
                  {tech.years} {t("years").toLowerCase()}
                </span>
              </div>

              <div className="stack-track" aria-hidden="true">
                {Array.from({ length: MAX_YEARS }).map((_, segIndex) => (
                  <motion.span
                    key={segIndex}
                    className={`seg ${segIndex < tech.years ? "lit" : ""}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.55 + index * 0.07 + segIndex * 0.05 }}
                  />
                ))}
              </div>

              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    className="stack-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <span>
                      {t("usedAt")} {tech.context}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="hero-actions"
        >
          <motion.a
            href={`/${locale}/about`}
            className="primary-action"
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(111, 0, 255, 0.45)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} />
            <span>{t("seeMore")}</span>
          </motion.a>

          <motion.button
            onClick={openContactModal}
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

// Animated Stat Component
function AnimatedStat({
  value,
  suffix,
  label,
  Icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
  delay: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.4, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [count, value, delay]);

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="stat-icon" size={24} />
      <span className="stat-number">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}
