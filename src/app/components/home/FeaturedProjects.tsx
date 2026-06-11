"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Folder, Star } from "lucide-react";

import { FEATURED_PROJECTS } from "@/app/data/projects";

import "./FeaturedProjects.scss";

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
        {FEATURED_PROJECTS.map((project, index) => (
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
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
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

            {(project.demo || project.repo) && (
              <a
                href={project.demo || project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="card-arrow"
                aria-label={`${t("openProject")}: ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            )}
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