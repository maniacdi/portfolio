"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Folder } from "lucide-react";

import { FEATURED_PROJECTS } from "@/app/data/projects";

import "./FeaturedProjects.scss";

export default function FeaturedProjects() {
  const t = useTranslations("featuredProjects");
  const locale = useLocale();

  return (
    <section id="proyectos" className="featured-projects">
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
        {FEATURED_PROJECTS.map((project, index) => {
          const primaryLink = project.demo || project.repo;
          return (
            <motion.article
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="project-media">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 540px"
                  />
                )}
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                {project.status && (
                  <span className={`project-status ${project.status}`}>
                    {t(`status.${project.status}`)}
                  </span>
                )}
              </div>

              <div className="project-body">
                <span className="project-category">{t(`categories.${project.category}`)}</span>

                <h3 className="project-title">
                  {primaryLink ? (
                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stretched-link"
                      aria-label={`${t("openProject")}: ${project.title}`}
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <p className="project-description">{t(project.descriptionKey)}</p>

                <div className="project-foot">
                  <span className="project-stack">{project.tags.slice(0, 4).join(" · ")}</span>
                  <div className="project-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`${t("liveDemo")}: ${project.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`${t("viewCode")}: ${project.title}`}
                      >
                        <Code2 size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
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