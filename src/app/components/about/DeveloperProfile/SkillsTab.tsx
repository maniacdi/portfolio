"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Database, Palette, Zap } from "lucide-react";

import type { ProfileData } from "@/utils/data/profileData";

interface SkillsTabProps {
  data: ProfileData["skills"];
  t: any;
}

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

              <div className="skills-tags">
                {skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.04 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
