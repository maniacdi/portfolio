"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { useToast } from "../toast/ToastProvider";
import "./GitHubRepos.scss";
import { useTranslations } from "next-intl";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

// Repos destacados en orden
const FEATURED_REPOS = [
  "portfolio",
  "portfolio-backend",
  "marvel-explorer",
  "ams-test",
  "pokemon-app",
  "vue-project",
];

export default function GitHubRepos() {
  const toast = useToast();
  const t = useTranslations("code");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.github.com/users/maniacdi/repos?sort=updated&per_page=100"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repos");
      }

      const allRepos: GitHubRepo[] = await response.json();

      // Filtrar y ordenar según FEATURED_REPOS
      const featuredRepos = FEATURED_REPOS.map((repoName) =>
        allRepos.find((repo) => repo.name === repoName)
      ).filter(Boolean) as GitHubRepo[];

      setRepos(featuredRepos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      toast.error("Error al cargar repositorios de GitHub");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178C6",
      JavaScript: "#F7DF1E",
      Vue: "#4FC08D",
      "C#": "#239120",
      Java: "#007396",
      HTML: "#E34F26",
      CSS: "#1572B6",
      Python: "#3776AB",
      "ASP.NET": "#5C2D91",
    };
    return colors[language] || "#8B949E";
  };

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  return (
    <section className="github-repos-section">
      <div className="section-header">
        <h2 className="section-title">
          <Github className="title-icon" />
          <span className="gradient-text">{t("feature")}</span>
        </h2>
        <p className="section-subtitle">
          {t("featuredRepos")}
        </p>
      </div>

      {loading ? (
        <div className="repos-loading">
          <div className="loader"></div>
          <p>{t("loading")}</p>
        </div>
      ) : repos.length === 0 ? (
        <div className="repos-empty">
          <Github size={48} />
          <p>{t("fail")}</p>
          <button onClick={fetchGitHubRepos} className="retry-button">
            {t("retry")}
          </button>
        </div>
      ) : (
        <div className="repos-grid">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="repo-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Language badge */}
              {repo.language && (
                <div className="repo-language">
                  <span
                    className="language-dot"
                    style={{
                      backgroundColor: getLanguageColor(repo.language),
                    }}
                  />
                  <span className="language-name">{repo.language}</span>
                </div>
              )}

              {/* Repo name */}
              <h3 className="repo-name">
                <Github size={20} />
                {repo.name}
              </h3>

              {/* Description */}
              <p className="repo-description">
                {repo.description || "No description available"}
              </p>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="repo-stats">
                <div className="stat">
                  <Star size={14} />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="stat">
                  <GitFork size={14} />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="stat updated">
                  {t("updated")} {getRelativeTime(repo.updated_at)}
                </div>
              </div>

              {/* Links */}
              <div className="repo-links">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                >
                  <Github size={16} />
                  {t("view")}
                </a>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link demo"
                  >
                    <ExternalLink size={16} />
                    {t("live")}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all repos link */}
      <motion.div
        className="view-all-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="https://github.com/maniacdi?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-link"
        >
          <Github size={20} />
          {t("viewAll")}
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </section>
  );
}