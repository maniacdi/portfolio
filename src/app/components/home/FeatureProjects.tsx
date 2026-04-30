"use client";

import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Folder, Star } from "lucide-react";

import "./FeaturedProjects.scss";

interface Project {
  title: string;
  descriptionKey: string;
  tags: string[];
  demo?: string;
  repo?: string;
  featured?: boolean;
  image?: string; // rute to screenshot /public/images/projects/
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    descriptionKey: "portfolioDesc",
    tags: ["Next.js", "TypeScript", "SCSS", "Framer Motion"],
    demo: "https://javimagaldi.com",
    repo: "https://github.com/maniacdi/portfolio",
    featured: true,
    image: "/images/projects/portfolio.webp",
  },
  {
    title: "Home Server Stack",
    descriptionKey: "homeServerDesc",
    tags: ["Docker", "Node.js", "Nginx", "Linux"],
    repo: "https://github.com/maniacdi",
    image: "/images/projects/homeserver.webp",
  },
];

export default function FeaturedProjects() {
  const t = useTranslations("featuredProjects");
  const locale = useLocale();

  return (
    <section className="featured-projects">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Folder size={14} />
        <span>{t("label")}</span>
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t("title")}
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("subtitle")}
      </motion.p>

      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.title}
            className={`project-card ${project.featured ? "featured" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
            whileHover={{ y: -4 }}
          >
            {project.image && (
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="image-overlay" />
                {project.featured && (
                  <div className="featured-badge">
                    <Star size={12} />
                    <span>{t("featuredLabel")}</span>
                  </div>
                )}
              </div>
            )}

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{t(project.descriptionKey)}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo"
                  >
                    <ExternalLink size={15} />
                    <span>{t("liveDemo")}</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link code"
                  >
                    <Code2 size={15} />
                    <span>{t("viewCode")}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="card-arrow">
              <ArrowUpRight size={18} />
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="view-all"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a
          href={`/${locale}/code`}
          className="view-all-link"
        >
          <span>{t("viewAll")}</span>
          <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}