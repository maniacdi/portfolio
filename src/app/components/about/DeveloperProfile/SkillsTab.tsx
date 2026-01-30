"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Palette, Database, Cpu, Code } from "lucide-react";
import type { ProfileData } from "@/utils/data/profileData";

interface SkillsTabProps {
  data: ProfileData["skills"];
  t: any;
}

type AnySkill = ProfileData["skills"][keyof ProfileData["skills"]][number];

const getCategoryIcon = (category: string) => {
  const icons = {
    frontend: Palette,
    backend: Database,
    tools: Cpu,
    languages: Code,
  };
  return icons[category as keyof typeof icons] || Zap;
};

export const SkillsTab = ({ data, t }: SkillsTabProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<AnySkill | null>(null);

  return (
    <motion.div
      className="tab-content skills-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="skills-header">
        <h3>
          <Zap size={20} />
          {t("techSkills")}
        </h3>
        <p className="skills-subtitle">{t("hoverAd")}</p>
      </div>

      <div className="skills-grid">
        {Object.entries(data).map(([category, skills], categoryIndex) => {
          const Icon = getCategoryIcon(category);

          return (
            <motion.div
              key={category}
              className="skill-category"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="category-header">
                <Icon size={14} />
                <h4 className="category-title">{category}</h4>
              </div>

              <div className="skills-list">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className={`skill-item ${hoveredSkill?.name === skill.name ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      color: "var(--neon)",
                    }}
                  >
                    <div className="skill-name">{skill.name}</div>
                    <motion.div
                      className="skill-progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                        duration: 0.8,
                      }}
                      style={{
                        transformOrigin: "left",
                        background: `linear-gradient(90deg, var(--neon-blue) 0%, var(--neon) ${skill.level}%)`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            className="skill-details-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h4>{hoveredSkill.name}</h4>
            <div className="skill-stats">
              <div className="stat">
                <span className="stat-label">{t("proficiency")}</span>
                <span className="stat-value">{hoveredSkill.level}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">{t("experience")}</span>
                <span className="stat-value">{hoveredSkill.years}+ {t("years")}</span>
              </div>
            </div>
            <div className="skill-level-bar">
              <motion.div
                className="skill-level-fill"
                initial={{ width: 0 }}
                animate={{ width: `${hoveredSkill.level}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};