"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { MapPin } from "lucide-react";

import "./HorizontalTimeline.scss";

interface TimelineItem {
  period: string;
  location: string;
  company?: string;
  title: string;
  description?: string;
  institution?: string;
  specialization?: string;
  subjects?: string[];
  technologies?: string[];
}

interface HorizontalTimelineProps {
  experiences: TimelineItem[];
  education: TimelineItem[];
}

export const HorizontalTimeline: FC<HorizontalTimelineProps> = ({ experiences, education }) => {
  const t = useTranslations("about");

  return (
    <div className="timeline-container">
      <h2 className="timeline-section-title">{t("experienceLabel")}</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={`exp-${index}`}>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-period">{exp.period}</span>
                <span className="timeline-location">
                  <MapPin className="timeline-location-icon" /> {exp.location}
                </span>
              </div>
              <h3 className="timeline-title">{exp.title}</h3>
              {exp.company && <h4 className="timeline-subtitle">{exp.company}</h4>}
              <p className="timeline-description">{exp.description}</p>
              <div className="timeline-tags">
                {exp?.technologies?.map((tech, techIndex) => (
                  <span className="timeline-tag" key={`tech-${index}-${techIndex}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="timeline-dot"></div>
            {index < experiences.length - 1 && <div className="timeline-line"></div>}
          </div>
        ))}
      </div>

      <h2 className="timeline-section-title">{t("educationLabel")}</h2>
      <div className="timeline">
        {education.map((edu, index) => (
          <div className="timeline-item" key={`edu-${index}`}>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-period">{edu.period}</span>
                <span className="timeline-location">
                  <MapPin className="timeline-location-icon" /> {edu.location}
                </span>
              </div>
              <h3 className="timeline-title">{edu.title}</h3>
              {edu.institution && <h4 className="timeline-subtitle">{edu.institution}</h4>}
              {edu.specialization && <p className="timeline-description">{edu.specialization}</p>}
              <div className="timeline-tags">
                {edu.subjects?.map((subject, subjectIndex) => (
                  <span className="timeline-tag" key={`subject-${index}-${subjectIndex}`}>
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <div className="timeline-dot"></div>
            {index < education.length - 1 && <div className="timeline-line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
