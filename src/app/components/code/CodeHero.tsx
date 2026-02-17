"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, BookOpen, Star, GitFork } from "lucide-react";
import { useTranslations } from "next-intl";
import "./CodeHero.scss";

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
}

export default function CodeHero() {
  const t = useTranslations("code");
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 11,
    totalStars: 0,
    totalForks: 0,
  });

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/users/maniacdi/repos?per_page=100"
      );

      if (!response.ok) return;

      const repos = await response.json();

      const totalStars = repos.reduce(
        (acc: number, repo: any) => acc + repo.stargazers_count,
        0
      );
      const totalForks = repos.reduce(
        (acc: number, repo: any) => acc + repo.forks_count,
        0
      );

      setStats({
        totalRepos: repos.length,
        totalStars,
        totalForks,
      });
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
    }
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

        <h1 className="hero-title gradient-text">
         {t("code")}
        </h1>

        <p className="hero-description">
          {t("description")}
        </p>

        <div className="hero-stats">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.totalStars}</span>
              <span className="stat-label">{t("stars")}</span>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <GitFork className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.totalForks}</span>
              <span className="stat-label">{t("forks")}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}