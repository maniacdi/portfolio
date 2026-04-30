"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Code2,
  Cpu,
  Download,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { cvService } from "../../services/cvService";

import "./PowerHero.scss";

const TECH_STACK = [
  { name: "REACT", level: 95, projects: 6, years: 5 },
  { name: "NODE.JS", level: 85, projects: 2, years: 4 },
  { name: "TYPESCRIPT", level: 95, projects: 7, years: 5 },
  { name: "CSS", level: 88, projects: 7, years: 5 },
  { name: "VUE", level: 70, projects: 1, years: 1 },
] as const;

const TERMINAL_COMMANDS = [
  "whoami",
  "cat about.md",
  "npm run create-awesome",
  "git commit -m 'Building the future'",
  "docker compose up innovation",
] as const;

const STATS = [
  { value: 8, label: "projects", icon: Briefcase },
  { value: 5, label: "years", icon: Calendar },
] as const;

export default function PowerHero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "es" | "en";
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    <section
      className="power-hero"
    >
      {/* Animated Background */}
      <div className="tech-background">
        <div className="grid-overlay" />
        <div className="gradient-orb" />

        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="hero-container"
      >
        {/* Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          transition={{ duration: 1, delay: 0.2 }}
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
          transition={{ duration: 0.8, delay: 0.3 }}
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

        {/* Value Proposition */}
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

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="stats-grid"
        >
          {STATS.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={t(stat.label)}
              Icon={stat.icon}
              delay={0.6 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Interactive Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="quick-stack"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`stack-item ${hoveredTech === tech.name ? "hovered" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(111, 0, 255, 0.08)",
              }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="stack-header">
                <span className="stack-name">{tech.name}</span>
                <span className="stack-level">{tech.level}%</span>
              </div>

              <div className="stack-bar">
                <motion.div
                  className="stack-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.1 }}
                />
              </div>

              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    className="stack-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {/* <span>{tech.projects} proyectos</span> */}
                    <span>•</span>
                    <span>
                      {tech.years} {t("yearsLabel")}
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
          transition={{ duration: 0.8, delay: 0.9 }}
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

          <motion.a
            href="mailto:magaldi6@gmail.com"
            className="secondary-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
            <span>{t("ctaPrimary")}</span>
          </motion.a>

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
  label,
  Icon,
  delay,
}: {
  value: number;
  label: string;
  Icon: any;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(counter);
          setHasAnimated(true);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="stat-icon" size={24} />
      <span className="stat-number">{count || value}+</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}
