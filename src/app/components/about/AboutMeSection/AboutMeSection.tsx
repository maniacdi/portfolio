"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Server,
  Cpu,
  Zap,
  Globe,
  Rocket,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";
import "./AboutMeSection.scss";
import { DeveloperProfile } from "@/app/components/about/DeveloperProfile/DeveloperProfile";
import TechCarousel from "../TechCarousel/TechCarousel";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations("about");

  // Tech stack data
  const techStack = [
    { name: "React/Next.js", icon: <Cpu size={20} />, color: "#61DAFB" },
    { name: "TypeScript", icon: <Code size={20} />, color: "#3178C6" },
    { name: "Node.js", icon: <Server size={20} />, color: "#339933" },
    { name: "MongoDB", icon: <Database size={20} />, color: "#47A248" },
    { name: "SCSS/Tailwind", icon: <Palette size={20} />, color: "#CC6699" },
    { name: "Framer Motion", icon: <Sparkles size={20} />, color: "#FF4EDD" },
  ];

  // Experience timeline
  const experiences = [
    { year: "2023-Present", role: "Fronted Developer", company: "AMS Solutions" },
    { year: "2022-2023", role: "Full-stack Developer", company: "Innova-tsn" },
    { year: "2020-2022", role: "Fronted Developer", company: "Incentro" },
  ];

  // Education
  const education = [
    { degree: "Computer Science", institution: "University of Cantabria", year: "2015-2021" },
  ];

  return (
    <>
      <section className={`about-section ${className}`} aria-labelledby="about-title" role="region">
        <div className="about-content">
          <DeveloperProfile className="developer-profile-side" />
          <div className="about-main">
            {/* Hero Header */}
            <motion.div
              className="about-hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="title-container">
                <Sparkles className="sparkle-icon" />
                <h1 id="about-title" className="about-title">
                  {t("title")}
                  <span className="title-gradient">_</span>
                </h1>
              </div>

              <p className="about-subtitle">{t("subtitle")}</p>
              <p className="about-description">{t("description")}</p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              className="skills-grid"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="skill-card neon-card">
                <div className="skill-icon frontend-icon">
                  <Globe size={28} />
                </div>
                <h3 className="skill-title">{t("skills.frontend")}</h3>
                <p className="skill-desc">{t("frontendDesc")}</p>
                <div className="skill-glow"></div>
              </div>

              <div className="skill-card neon-card">
                <div className="skill-icon backend-icon">
                  <Server size={28} />
                </div>
                <h3 className="skill-title">{t("skills.backend")}</h3>
                <p className="skill-desc">{t("backendDesc")}</p>
                <div className="skill-glow"></div>
              </div>

              <div className="skill-card neon-card">
                <div className="skill-icon fullstack-icon">
                  <Rocket size={28} />
                </div>
                <h3 className="skill-title">{t("skills.fullstack")}</h3>
                <p className="skill-desc">{t("fullstackDesc")}</p>
                <div className="skill-glow"></div>
              </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="about-content-grid">
              {/* Left Column: Experience & Education */}
              <motion.div
                className="about-column"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Experience */}
                <div className="timeline-section">
                  <div className="section-header">
                    <Briefcase size={22} />
                    <h3>{t("experience")}</h3>
                  </div>
                  <div className="timeline">
                    {experiences.map((exp, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-year">{exp.year}</div>
                        <div className="timeline-content">
                          <h4>{exp.role}</h4>
                          <p>{exp.company}</p>
                        </div>
                        <div className="timeline-dot"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="timeline-section">
                  <div className="section-header">
                    <GraduationCap size={22} />
                    <h3>{t("education")}</h3>
                  </div>
                  <div className="timeline">
                    {education.map((edu, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-year">{edu.year}</div>
                        <div className="timeline-content">
                          <h4>{edu.degree}</h4>
                          <p>{edu.institution}</p>
                        </div>
                        <div className="timeline-dot"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <TechCarousel />
      {/* CTA Section */}
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

// Add Database icon if not imported
const Database = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 3.79 5 6v12c0 2.21 3.13 4 7 4s7-1.79 7-4V6c0-2.21-3.13-4-7-4zm0 2c3.31 0 5 1.34 5 2s-1.69 2-5 2-5-1.34-5-2 1.69-2 5-2zm5 4.25C17 9.31 14.31 11 12 11s-5-1.69-5-3.75V8c0 1.41 2.69 3 5 3s5-1.59 5-3v-.75zM12 13c-3.31 0-5-1.34-5-2v2c0 1.41 2.69 3 5 3s5-1.59 5-3v-2c0 .66-1.69 2-5 2z" />
  </svg>
);
