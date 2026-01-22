"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import "./HorizontalTimeline.scss";

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description?: string;
  type: 'work' | 'education';
  tags?: string[];
}

interface HorizontalTimelineProps {
  experiences: TimelineItem[];
  education: TimelineItem[];
  className?: string;
}

export const HorizontalTimeline: FC<HorizontalTimelineProps> = ({
  experiences,
  education,
  className = "",
}) => {
  const allItems = [...experiences, ...education].sort((a, b) => {
    const yearA = parseInt(a.year.split('-')[0]);
    const yearB = parseInt(b.year.split('-')[0]);
    return yearB - yearA;
  });

  return (
    <section className={`horizontal-timeline ${className}`}>
      {/* Header */}
      <div className="timeline-header">
        <div className="header-content">
          <h2 className="timeline-title">Professional Journey</h2>
          <p className="timeline-subtitle">
            A timeline of my career development and education
          </p>
        </div>
        <div className="timeline-controls">
          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot work"></div>
              <span>Work Experience</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot education"></div>
              <span>Education</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="timeline-track">
        <div className="track-line"></div>
        
        {/* Timeline Items */}
        <div className="timeline-items">
          {allItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-card ${item.type}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Header */}
              <div className="card-header">
                <div className="card-icon">
                  {item.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                </div>
                <div className="card-year">{item.year}</div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-subtitle">{item.subtitle}</p>
                
                {item.description && (
                  <p className="card-description">{item.description}</p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="card-tags">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <div className="footer-item">
                  <Calendar size={14} />
                  <span>{item.year}</span>
                </div>
                {item.type === 'work' && (
                  <div className="footer-item">
                    <MapPin size={14} />
                    <span>Remote</span>
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {index < allItems.length - 1 && (
                <div className="card-connector"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Years Scale */}
      <div className="years-scale">
        {Array.from({ length: 8 }, (_, i) => 2024 - i).map((year) => (
          <div key={year} className="year-marker">
            <div className="marker-line"></div>
            <div className="marker-label">{year}</div>
          </div>
        ))}
      </div>
    </section>
  );
};