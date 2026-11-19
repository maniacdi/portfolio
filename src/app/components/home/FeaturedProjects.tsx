"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

import { CLIENT_SLUGS, FEATURED_PROJECTS } from "@/app/data/projects";
import LocalizedLink from "@components/common/LocalizedLink";

import "./FeaturedProjects.scss";

// Client sites already lead the home in ClientWork. Only home uses this
// section, so it shows the first four; /projects lists them all.
const OTHER_PROJECTS = FEATURED_PROJECTS.filter(
  (p) => !(CLIENT_SLUGS as readonly string[]).includes(p.slug)
).slice(0, 4);

export default function FeaturedProjects() {
  const t = useTranslations("featuredProjects");
  const reduceMotion = useReducedMotion();

  return (
    <section id="proyectos" className="featured-projects">
      <motion.h2 className="section-title reveal">{t("title")}</motion.h2>

      <motion.p className="section-subtitle reveal">{t("subtitle")}</motion.p>

      <div className="projects-grid">
        {OTHER_PROJECTS.map((project, index) => {
          return (
            <motion.article
              key={project.title}
              className="project-card reveal"
              whileHover={reduceMotion ? undefined : { y: -5 }}
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
                  <LocalizedLink
                    href={`/projects/${project.slug}`}
                    className="stretched-link"
                    aria-label={`${t("openProject")}: ${project.title}`}
                  >
                    {project.title}
                  </LocalizedLink>
                </h3>

                <p className="project-description">{t(project.descriptionKey)}</p>

                <div className="project-foot">
                  <ul className="project-stack">
                    {project.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
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

      <motion.div className="view-all reveal">
        <LocalizedLink href="/projects" className="view-all-link">
          {t("viewAll")}
        </LocalizedLink>
      </motion.div>
    </section>
  );
}
