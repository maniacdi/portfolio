"use client";

import { useCallback, useEffect, useState } from "react";
import { FaJava } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiCypress,
  SiDocker,
  SiExpo,
  SiFigma,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FEATURED_PROJECTS } from "@/app/data/projects";
import { profileData, type SkillCategory } from "@/utils/data/profileData";
import LocalizedLink from "@components/common/LocalizedLink";

import "./TechCarousel.scss";

interface TechItem {
  // Name exactly as in profileData.skills: years come from there (the CV).
  skill: string;
  label: string;
  icon: React.ReactNode;
  // Project tags that count as "used in" for this technology.
  tags: string[];
  // No portfolio project shows it, but it is part of company work.
  atWork?: boolean;
}

// The short list worth a spotlight; the full stack lives in the CV.
const TECHS: TechItem[] = [
  { skill: "React", label: "React", icon: <SiReact />, tags: ["React"] },
  { skill: "TypeScript", label: "TypeScript", icon: <SiTypescript />, tags: ["TypeScript"] },
  { skill: "Next.js", label: "Next.js", icon: <SiNextdotjs />, tags: ["Next.js"] },
  { skill: "Java · Spring Boot", label: "Java · Spring", icon: <FaJava />, tags: [], atWork: true },
  { skill: "Node.js", label: "Node.js", icon: <SiNodedotjs />, tags: ["Node.js"] },
  {
    skill: "React Native",
    label: "React Native",
    icon: <RiReactjsLine />,
    tags: ["React Native"],
  },
  { skill: "SCSS / Sass", label: "SCSS", icon: <SiSass />, tags: ["SCSS"] },
  { skill: "Redux / Zustand", label: "Redux · Zustand", icon: <SiRedux />, tags: [], atWork: true },
  { skill: "Vue 3", label: "Vue 3", icon: <SiVuedotjs />, tags: [], atWork: true },
  { skill: "MongoDB", label: "MongoDB", icon: <SiMongodb />, tags: ["MongoDB"] },
  { skill: "Docker", label: "Docker", icon: <SiDocker />, tags: ["Docker"] },
  { skill: "Cypress", label: "Cypress", icon: <SiCypress />, tags: [], atWork: true },
  { skill: "Expo", label: "Expo", icon: <SiExpo />, tags: ["Expo"] },
  { skill: "Git", label: "Git", icon: <SiGit />, tags: [] },
  { skill: "Figma", label: "Figma", icon: <SiFigma />, tags: [] },
];

const AUTOPLAY_MS = 4500;

function skillInfo(name: string): { years: number; category: SkillCategory } | null {
  for (const category of Object.keys(profileData.skills) as SkillCategory[]) {
    const found = profileData.skills[category].find((s) => s.name === name);
    if (found) return { years: found.years, category };
  }
  return null;
}

// Signed distance from the active slide on a circular list (-n/2..n/2).
function offsetFrom(index: number, current: number, total: number): number {
  let d = index - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

export default function TechCarousel() {
  const t = useTranslations("techCarousel");
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TECHS.length;

  const go = useCallback((step: number) => setCurrent((c) => (c + step + total) % total), [total]);

  // One timer per slide, so the progress segment and the switch stay in step.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, paused, reduceMotion, go]);

  const active = TECHS[current];
  const info = skillInfo(active.skill);
  const usedIn = FEATURED_PROJECTS.filter((p) => p.tags.some((tag) => active.tags.includes(tag)));

  return (
    <section className="tech-stage-section" aria-labelledby="tech-stage-title">
      <div className="tech-stage-header">
        <p className="section-label">
          <span>{t("label")}</span>
        </p>
        <h2 id="tech-stage-title" className="tech-stage-title">
          {t("title")}
        </h2>
        <p className="tech-stage-subtitle">{t("subtitle")}</p>
      </div>

      <div
        className="tech-stage"
        role="region"
        aria-roledescription={t("roleDescription")}
        aria-label={t("title")}
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Giant outlined name behind the cards. */}
        <div
          className="tech-stage-ghost"
          aria-hidden="true"
          style={{ "--chars": active.label.length } as React.CSSProperties}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active.label}
              initial={reduceMotion ? false : { x: "30%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={reduceMotion ? undefined : { x: "-30%", opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {active.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div
          className="tech-stage-track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, { offset }) => {
            if (offset.x < -60) go(1);
            if (offset.x > 60) go(-1);
          }}
        >
          {TECHS.map((tech, index) => {
            const d = offsetFrom(index, current, total);
            const visible = Math.abs(d) <= 2;
            const techInfo = skillInfo(tech.skill);
            return (
              <motion.button
                key={tech.skill}
                type="button"
                className={`tech-slide ${d === 0 ? "is-active" : ""}`}
                aria-hidden={d !== 0}
                tabIndex={-1}
                onClick={() => d !== 0 && setCurrent(index)}
                initial={false}
                animate={{
                  x: `${d * 78}%`,
                  rotateY: d * -32,
                  scale: 1 - Math.abs(d) * 0.16,
                  opacity: visible ? 1 : 0,
                  filter: `brightness(${1 - Math.abs(d) * 0.3})`,
                }}
                style={{ zIndex: 10 - Math.abs(d), pointerEvents: visible ? "auto" : "none" }}
                transition={
                  reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }
                }
              >
                <span className="tech-slide-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="tech-slide-icon">{tech.icon}</span>
                <span className="tech-slide-name">{tech.label}</span>
                {techInfo && (
                  <span className="tech-slide-meta">
                    {t("years", { years: techInfo.years })} · {t(`categories.${techInfo.category}`)}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <p className="tech-stage-used" aria-live="polite">
        <span className="sr-only">
          {active.label}
          {info ? `, ${t("years", { years: info.years })}. ` : ". "}
        </span>
        {usedIn.length > 0 ? (
          <>
            <span className="tech-stage-used-label">{t("usedIn")}</span>
            {usedIn.map((p) => (
              <LocalizedLink key={p.slug} href={`/projects/${p.slug}`}>
                {p.title}
              </LocalizedLink>
            ))}
          </>
        ) : active.atWork ? (
          <span className="tech-stage-used-label">{t("usedAtWork")}</span>
        ) : null}
      </p>

      <div className="tech-stage-controls">
        <button
          type="button"
          className="tech-stage-btn"
          onClick={() => go(-1)}
          aria-label={t("previous")}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="tech-stage-progress" aria-hidden="true">
          {TECHS.map((tech, index) => (
            <span
              key={tech.skill}
              className={`tech-stage-segment ${index < current ? "is-done" : ""} ${
                index === current ? "is-current" : ""
              }`}
            >
              {index === current && (
                <i
                  key={current}
                  style={{
                    animationDuration: `${AUTOPLAY_MS}ms`,
                    animationPlayState: paused || reduceMotion ? "paused" : "running",
                  }}
                />
              )}
            </span>
          ))}
        </div>

        <span className="tech-stage-counter">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <button
          type="button"
          className="tech-stage-btn"
          onClick={() => go(1)}
          aria-label={t("next")}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
