"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";

import { DeveloperProfile } from "@/app/components/about/DeveloperProfile/DeveloperProfile";
import { useContactModalStore } from "@/app/store/useContactModalStore";
import LocalizedLink from "@components/common/LocalizedLink";

import { HorizontalTimeline } from "../HorizontalTimeline/HorizontalTimeline";

import "./AboutMeSection.scss";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations("about");
  const openContactModal = useContactModalStore((state) => state.open);

  const experiences = [
    {
      period: "2023-Presente",
      location: "A Coruña, España",
      title: `${t("exp1Title")}`,
      company: "AMS Solutions",
      description: `${t("exp1Description")}`,
      technologies: [
        "React",
        "TypeScript",
        "Java · Spring Boot",
        "MongoDB · Redis",
        "Microfrontends",
      ],
    },
    {
      period: "2022-2023",
      location: "Santander, España",
      title: `${t("exp2Title")}`,
      company: "Innova-tsn",
      description: `${t("exp2Description")}`,
      technologies: ["React", "SQL"],
    },
    {
      period: "2020-2022",
      location: "Santander, España",
      title: `${t("exp3Title")}`,
      company: "Incentro",
      description: `${t("exp3Description")}`,
      technologies: ["React", "JavaScript", "CMS"],
    },
  ];

  const education = [
    {
      period: "2014-2020",
      location: "España",
      title: `${t("edu1Title")}`,
      institution: `${t("edu1Subtitle")}`,
      specialization: `${t("edu1Description")}`,
      subjects: [
        `${t("educationSubjects.algorithms")}`,
        `${t("educationSubjects.dataStructures")}`,
        `${t("educationSubjects.softwareEngineering")}`,
      ],
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
        className="off-hours"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="off-hours-icon">
          <MapPin size={26} />
        </span>
        <div className="off-hours-text">
          <p className="off-hours-lead">{t("offHoursLead")}</p>
          <p className="off-hours-sub">{t("travelsSub")}</p>
        </div>
        <LocalizedLink href="/travels" className="off-hours-link">
          <span>{t("travelsLink")}</span>
          <ArrowRight size={16} />
        </LocalizedLink>
      </motion.div>
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
