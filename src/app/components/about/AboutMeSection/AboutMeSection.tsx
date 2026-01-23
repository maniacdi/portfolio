"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import "./AboutMeSection.scss";
import { DeveloperProfile } from "@/app/components/about/DeveloperProfile/DeveloperProfile";
import TechCarousel from "../TechCarousel/TechCarousel";
import { HorizontalTimeline } from "../HorizontalTimeline/HorizontalTimeline";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations("about");

  // Timeline data
  const experiences = [
    {
      id: "exp1",
      year: "2023-Present",
      title: `${t("exp1Title")}`,
      subtitle: "AMS Solutions",
      description: `${t("exp1Description")}`,
      type: "work" as const,
      tags: ["React", "TypeScript", "Next.js", "SCSS"],
    },
    {
      id: "exp2",
      year: "2022-2023",
      title: `${t("exp2Title")}`,
      subtitle: "Innova-tsn",
      description: `${t("exp2Description")}`,
      type: "work" as const,
      tags: ["Node.js", "MongoDB", "Express", "React"],
    },
    {
      id: "exp3",
      year: "2020-2022",
      title: `${t("exp1Title")}`,
      subtitle: "Incentro",
      description: `${t("exp3Description")}`,
      type: "work" as const,
      tags: ["JavaScript", "Vue.js", "CSS", "UI/UX"],
    },
  ];

  const education = [
    {
      id: "edu1",
      year: "2015-2021",
      title: `${t("edu1Title")}`,
      subtitle: `${t("edu1Subtitle")}`,
      description: `${t("edu1Description")}`,
      type: "education" as const,
      tags: ["Algorithms", "Databases", "Software Engineering", "Networks"],
    },
  ];

  return (
    <>
      <section className={`about-section ${className}`} aria-labelledby="about-title" role="region">
        <div className="about-content">
          <DeveloperProfile className="developer-profile-side" />

          <div className="timeline-section">
            <HorizontalTimeline experiences={experiences} education={education} />
          </div>
        </div>
      </section>
      <TechCarousel />
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="cta-content">
          <h3 className="cta-title">{t("cta")}</h3>
          <p className="cta-subtitle">{t("ctaText")}</p>
          <button className="neon-button">
            <span>{t("ctaButton")}</span>
            <Zap size={16} />
          </button>
        </div>
        <div className="cta-glow"></div>
      </motion.div>
    </>
  );
};
