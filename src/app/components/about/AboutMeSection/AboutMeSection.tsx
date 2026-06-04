"use client";

import { FC, use } from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

import { DeveloperProfile } from "@/app/components/about/DeveloperProfile/DeveloperProfile";

import { HorizontalTimeline } from "../HorizontalTimeline/HorizontalTimeline";

import "./AboutMeSection.scss";
import { useContactModalStore } from "@/app/store/useContactModalStore";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations("about");
  const openContactModal = useContactModalStore((state) => state.open);

  const experiences = [
    {
      period: "2023-Presente",
      location: "España",
      title: `${t("exp1Title")}`,
      company: "AMS Solutions",
      description: `${t("exp1Description")}`,
      technologies: ["React", "TypeScript", "Next.js"],
    },
    {
      period: "2022-2023",
      location: "España",
      title: `${t("exp2Title")}`,
      company: "Innova-tsn",
      description: `${t("exp2Description")}`,
      technologies: ["Node.js", "MongoDB", "Express"],
    },
    {
      period: "2020-2022",
      location: "España",
      title: `${t("exp1Title")}`,
      company: "Incentro",
      description: `${t("exp3Description")}`,
      technologies: ["JavaScript", "Vue.js", "CSS"],
    },
  ];

  const education = [
    {
      period: "2015-2021",
      location: "España",
      title: `${t("edu1Title")}`,
      institution: `${t("edu1Subtitle")}`,
      specialization: `${t("edu1Description")}`,
      subjects: [`${t("educationSubjects.algorithms")}`, `${t("educationSubjects.dataStructures")}`, `${t("educationSubjects.softwareEngineering")}`],
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
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="cta-content">
          <h3 className="cta-title">{t("cta")}</h3>
          <p className="cta-subtitle">{t("ctaText")}</p>
          <button type="button" onClick={() => openContactModal()} className="neon-button">
            <span>{t("ctaButton")}</span>
            <Zap size={16} />
          </button>
        </div>
        <div className="cta-glow"></div>
      </motion.div>
    </>
  );
};
