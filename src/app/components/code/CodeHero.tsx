"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, BookOpen, Calendar, Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  fetchGitHubStats,
  fetchPrimaryLanguages,
  GitHubStats,
} from "@/app/services/githubService";
import "./CodeHero.scss";

export default function CodeHero() {
  const t = useTranslations("code");
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 11,
    totalLanguages: 5,
    yearsActive: 3,
  });
  const [primaryLanguages, setPrimaryLanguages] = useState<string[]>([
    "TypeScript",
    "JavaScript",
    "React",
  ]);

  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    const [statsData, languagesData] = await Promise.all([
      fetchGitHubStats(),
      fetchPrimaryLanguages(),
    ]);

    setStats(statsData);
    setPrimaryLanguages(languagesData);
  };

  return (
    <section className="code-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-content"
      >
        <div className="hero-badge">
          <Code2 size={16} />
          <span>{t("openSource")}</span>
        </div>

        <h1 className="hero-title">
          {t("code").split(" ")[0]}{" "}
          <span className="gradient-text">
            {t("code").split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="hero-description">{t("description")}</p>

        <div className="hero-stats-mini">
          <motion.div
            className="stat-mini"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BookOpen size={20} />
            <span>
              {stats.totalRepos} {t("projects")}
            </span>
          </motion.div>

          <motion.div
            className="stat-mini tech-stack"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Code2 size={20} />
            <span>{primaryLanguages.join(" · ")}</span>
          </motion.div>
        </div>

        <div className="hero-stats">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.totalRepos}</span>
              <span className="stat-label">{t("repositories")}</span>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Code2 className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.totalLanguages}+</span>
              <span className="stat-label">{t("languages")}</span>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.yearsActive}+</span>
              <span className="stat-label">{t("active")}</span>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="https://github.com/maniacdi?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
          {t("viewGithub")}
          <ExternalLink size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}