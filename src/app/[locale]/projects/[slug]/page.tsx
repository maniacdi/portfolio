import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from "lucide-react";

import LocalizedLink from "@components/common/LocalizedLink";
import { fetchProjectBySlug, fetchProjectSlugs, localize } from "@/app/services/projectsService";

import "@/styles/page.scss";
import "../projectPage.scss";

const BASE_URL = "https://javimagaldi.com";
const LOCALES = ["es", "en"] as const;

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return {};

  const isEs = locale === "es";
  const title =
    localize(project.seo?.title, locale) ||
    `${project.title} — ${localize(project.tagline, locale)}`;
  const description =
    localize(project.seo?.description, locale) ||
    localize(project.summary, locale) ||
    localize(project.tagline, locale);
  const path = `/projects/${slug}`;
  const canonical = isEs ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const image = project.coverImage ? `${BASE_URL}${project.coverImage}` : `${BASE_URL}/images/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projectPage" });
  const tf = await getTranslations({ locale, namespace: "featuredProjects" });

  const tagline = localize(project.tagline, locale);
  const summary = localize(project.summary, locale);
  const problem = localize(project.problem, locale);
  const solution = localize(project.solution, locale);
  const gallery = (project.images || []).filter((img) => img !== project.coverImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: tagline,
    description: summary || tagline,
    url: `${BASE_URL}${locale === "es" ? "" : "/en"}/projects/${slug}`,
    image: project.coverImage ? `${BASE_URL}${project.coverImage}` : undefined,
    keywords: (project.stack || []).join(", "),
    author: { "@type": "Person", name: "Javi García Magaldi", url: BASE_URL },
    ...(project.demo ? { sameAs: project.demo } : {}),
  };

  return (
    <main className="page-container project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LocalizedLink href="/projects" className="project-back">
        <ArrowLeft size={16} />
        <span>{t("back")}</span>
      </LocalizedLink>

      <header className="project-detail-head">
        <div className="project-detail-meta">
          <span className="project-category">{tf(`categories.${project.category}`)}</span>
          {project.status && (
            <span className={`project-status ${project.status}`}>
              {tf(`status.${project.status}`)}
            </span>
          )}
          {project.year && <span className="project-year">{project.year}</span>}
        </div>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-tagline">{tagline}</p>

        <div className="project-detail-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <ExternalLink size={16} />
              <span>{tf("liveDemo")}</span>
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Code2 size={16} />
              <span>{tf("viewCode")}</span>
            </a>
          )}
        </div>
      </header>

      {project.coverImage && (
        <div className="project-detail-cover">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            priority
          />
        </div>
      )}

      <div className="project-detail-body">
        {summary && (
          <section className="project-block">
            <p className="project-summary">{summary}</p>
          </section>
        )}

        {problem && (
          <section className="project-block">
            <h2>{t("problem")}</h2>
            <p>{problem}</p>
          </section>
        )}

        {solution && (
          <section className="project-block">
            <h2>{t("solution")}</h2>
            <p>{solution}</p>
          </section>
        )}

        {project.stack && project.stack.length > 0 && (
          <section className="project-block">
            <h2>{t("stack")}</h2>
            <div className="project-stack-tags">
              {project.stack.map((tech) => (
                <span key={tech} className="stack-tag">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="project-block">
            <h2>{t("gallery")}</h2>
            <div className="project-gallery">
              {gallery.map((img, i) => (
                <div key={img} className="gallery-item">
                  <Image
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <LocalizedLink href="/projects" className="project-all-link">
        <span>{t("allProjects")}</span>
        <ArrowUpRight size={16} />
      </LocalizedLink>
    </main>
  );
}
