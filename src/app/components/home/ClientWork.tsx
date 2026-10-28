"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ArrowUpRight, Users } from "lucide-react";

import { CLIENT_PROJECTS, type Project, projectLink } from "@/app/data/projects";
import LocalizedLink from "@components/common/LocalizedLink";
import Reveal from "@components/common/Reveal";

import "./ClientWork.scss";

// Intrinsic size of each full.webp (960px wide, full page height).
const CAPTURE_HEIGHT: Record<string, number> = {
  umedicinaestetica: 5657,
  uskinstore: 5300,
};

function ClientFrame({ project }: { project: Project }) {
  const t = useTranslations("clientWork");
  const tProjects = useTranslations("featuredProjects");
  const frameRef = useRef<HTMLElement>(null);
  const link = projectLink(project);
  const launched = project.launched !== false;
  const host = project.demo ? new URL(project.demo).hostname : project.slug;

  // Touch screens have no hover: scroll the capture once when it enters view.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-playing");
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameContent = (
    <>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-url">{host}</span>
      </div>
      <div className="frame-window">
        <Image
          src={project.fullImage!}
          alt={project.title}
          width={960}
          height={CAPTURE_HEIGHT[project.slug] ?? 4000}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="frame-capture"
        />
        {!launched && <span className="frame-stamp">{t("comingSoon")}</span>}
      </div>
    </>
  );

  return (
    <article className="client-item">
      <figure className="client-frame" ref={frameRef}>
        {link.external ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="frame-link"
            aria-label={`${t("visit")}: ${project.title}`}
          >
            {frameContent}
          </a>
        ) : (
          <LocalizedLink
            href={link.href}
            className="frame-link"
            aria-label={`${t("caseStudy")}: ${project.title}`}
          >
            {frameContent}
          </LocalizedLink>
        )}
      </figure>

      <div className="client-caption">
        <h3 className="client-title">{project.title}</h3>
        <p className="client-desc">{tProjects(project.descriptionKey)}</p>
        <span className="client-stack">{project.tags.join(" · ")}</span>
        <div className="client-links">
          {link.external && (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="client-link">
              {t("visit")}
              <ArrowUpRight size={15} />
            </a>
          )}
          <LocalizedLink href={`/projects/${project.slug}`} className="client-link">
            {t("caseStudy")}
            <ArrowUpRight size={15} />
          </LocalizedLink>
        </div>
      </div>
    </article>
  );
}

export default function ClientWork() {
  const t = useTranslations("clientWork");

  return (
    <section id="clientes" className="client-work">
      <Reveal className="section-label">
        <Users size={14} />
        <span>{t("label")}</span>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="section-title">{t("title")}</h2>
      </Reveal>

      <div className="client-list">
        {CLIENT_PROJECTS.map((project) => (
          <Reveal key={project.slug} delay={0.1}>
            <ClientFrame project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
