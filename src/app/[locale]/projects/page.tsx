import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ArrowUpRight } from "lucide-react";

import LocalizedLink from "@components/common/LocalizedLink";
import { fetchProjects, localize } from "@/app/services/projectsService";

import "@/styles/page.scss";
import "./projectPage.scss";

const BASE_URL = "https://javimagaldi.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const isEs = locale === "es";
  const canonical = isEs ? `${BASE_URL}/projects` : `${BASE_URL}/en/projects`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/projects`,
        en: `${BASE_URL}/en/projects`,
        "x-default": `${BASE_URL}/projects`,
      },
    },
  };
}

export default async function ProjectsListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const tf = await getTranslations({ locale, namespace: "featuredProjects" });
  const projects = await fetchProjects();

  return (
    <main className="page-container projects-list-page">
      <h1 className="page-title gradient-text">{t("title")}</h1>
      <p className="page-description">{t("subtitle")}</p>

      <div className="projects-list-grid">
        {projects.map((project, index) => {
          const tagline = localize(project.tagline, locale);
          return (
            <LocalizedLink
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-list-card"
            >
              <div className="project-media">
                {project.coverImage && (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                )}
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                {project.status && (
                  <span className={`project-status ${project.status}`}>
                    {tf(`status.${project.status}`)}
                  </span>
                )}
              </div>
              <div className="project-list-body">
                <span className="project-category">{tf(`categories.${project.category}`)}</span>
                <h2 className="project-list-title">{project.title}</h2>
                {tagline && <p className="project-list-tagline">{tagline}</p>}
                <span className="project-list-stack">{(project.stack || []).slice(0, 4).join(" · ")}</span>
                <span className="project-list-go">
                  {t("viewProject")}
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </LocalizedLink>
          );
        })}
      </div>
    </main>
  );
}
