"use client";

import { useEffect,useState } from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { ExternalLink,GitFork, Github, Star } from "lucide-react";

import { fetchFeaturedRepos, GitHubRepo } from "@/app/services/githubService";

import { useToast } from "../toast/ToastProvider";

import "./GitHubRepos.scss";

// Ordered by impact — strongest projects first (they read better up top).
const FEATURED_REPOS = [
  "compras-app",
  "portfolio",
  "porra-mundial",
  "ironlog",
  "portfolio-backend",
  "compras-backend",
  "insta-checker",
  "pokemon-app",
  "vue-project",
];

export default function GitHubRepos() {
  const t = useTranslations("code");
  const toast = useToast();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    setLoading(true);

    try {
      const featuredRepos = await fetchFeaturedRepos(FEATURED_REPOS);
      setRepos(featuredRepos);

      if (featuredRepos.length === 0) {
        toast.warning(t("fail"));
      }
    } catch (error) {
      console.error("Error loading repos:", error);
      toast.error(t("fail"));
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
        const unitKey = interval > 1 ? `${unit}s` : unit;
        return `${interval} ${t(unitKey)} ${t("ago")}`;
      }
    }

    return t("justNow");
  };

  return (
    <section className="github-repos-section">
      <div className="section-header">
        <h2 className="section-title">
          <Github className="title-icon" />
          {t("feature")}
        </h2>
        <p className="section-subtitle">{t("featuredRepos")}</p>
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
          <button onClick={loadRepos} className="retry-button">
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

              <h3 className="repo-name">
                <Github size={20} />
                {repo.name}
              </h3>

              <p className="repo-description">{repo.description || t("noDescription")}</p>

              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              )}

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
