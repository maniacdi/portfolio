"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
} from "lucide-react";
import "./AboutMeSection.scss";
import { DeveloperProfile } from "@/app/components/about/DeveloperProfile/DeveloperProfile";
import TechCarousel from "../TechCarousel/TechCarousel";
import { HorizontalTimeline } from "../HorizontalTimeline/HorizontalTimeline";


interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations("about");

  // Experience timeline
  // const experiences = [
  //   { year: "2023-Present", role: "Fronted Developer", company: "AMS Solutions" },
  //   { year: "2022-2023", role: "Full-stack Developer", company: "Innova-tsn" },
  //   { year: "2020-2022", role: "Fronted Developer", company: "Incentro" },
  // ];

  // // Education
  // const education = [
  //   { degree: "Computer Science", institution: "University of Cantabria", year: "2015-2021" },
  // ];

   // Timeline data
  const experiences = [
    {
      id: "exp1",
      year: "2023-Present",
      title: "Frontend Developer",
      subtitle: "AMS Solutions",
      description: "Developing responsive web applications with React and TypeScript",
      type: "work" as const,
      tags: ["React", "TypeScript", "Next.js", "SCSS"]
    },
    {
      id: "exp2",
      year: "2022-2023",
      title: "Full-stack Developer",
      subtitle: "Innova-tsn",
      description: "Built full-stack applications with Node.js and MongoDB",
      type: "work" as const,
      tags: ["Node.js", "MongoDB", "Express", "React"]
    },
    {
      id: "exp3",
      year: "2020-2022",
      title: "Frontend Developer",
      subtitle: "Incentro",
      description: "Created user interfaces and implemented design systems",
      type: "work" as const,
      tags: ["JavaScript", "Vue.js", "CSS", "UI/UX"]
    }
  ];

  const education = [
    {
      id: "edu1",
      year: "2015-2021",
      title: "Computer Science Degree",
      subtitle: "University of Cantabria",
      description: "Specialized in software engineering and web technologies",
      type: "education" as const,
      tags: ["Algorithms", "Databases", "Software Engineering", "Networks"]
    }
  ];

  return (
    <>
      <section className={`about-section ${className}`} aria-labelledby="about-title" role="region">
        <div className="about-content">
          <DeveloperProfile className="developer-profile-side" />
            {/* <div className="about-content-grid">
              <motion.div
                className="about-column"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
            </div> */}
                    <div className="timeline-section">
          <HorizontalTimeline
            experiences={experiences}
            education={education}
          />
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
