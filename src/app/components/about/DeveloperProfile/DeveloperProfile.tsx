"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code,
  Copy,
  Check,
  ChevronRight,
  User,
  Mail,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  Cpu,
  Database,
  Palette,
  Sparkles,
  Zap,
  Code2,
  Heart,
} from "lucide-react";
import "./DeveloperProfile.scss";
import CVSection from "../../cv/CVSection";

interface DeveloperProfileProps {
  className?: string;
}

export const DeveloperProfile: FC<DeveloperProfileProps> = ({ className }) => {
  const t = useTranslations("about");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "contact">("profile");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const profileData = {
    profile: {
      name: "Javi García Magaldi",
      job: "Full-Stack Developer",
      location: "Santander, Spain",
      email: "magaldi6@gmail.com",
      experience: "5+ years",
      bio: "Passionate about creating digital experiences that combine aesthetics with functionality. Specializing in modern web technologies and clean code architecture.",
      status: "Available for projects",
    },
    skills: {
      frontend: ["React", "Tailwind CSS", "Framer Motion", "Redux"],
      backend: ["Node.js", "MongoDB", "JAVA"],
      tools: ["Git", "Docker", "Vercel", "Figma"],
      languages: ["TypeScript", "JAVA", "SQL", "C#"],
    },
    contact: {
      email: "magaldi6@gmail.com",
      github: "github.com/maniacdi",
      linkedin: "linkedin.com/in/javimagaldi",
      website: t("soon"),
    },
  };

  // Typing animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Cursor blink animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  // Glitch effect randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "profile", label: `${t("profile")}.json`, icon: User },
    { id: "skills", label: `${t("skillsSection")}.js`, icon: Code2 },
    { id: "contact", label: `${t("contactSection")}.md`, icon: Mail },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Palette size={14} />;
      case "backend":
        return <Database size={14} />;
      case "tools":
        return <Cpu size={14} />;
      case "languages":
        return <Code size={14} />;
      default:
        return <Zap size={14} />;
    }
  };

  return (
    <motion.div
      className={`developer-profile ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="profile-background">
        <div className="floating-shapes">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`floating-shape shape-${i}`}
              animate={{
                y: [0, -20, 0],
                x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className={`profile-card ${glitchEffect ? "glitch" : ""}`}>
        <div className="terminal-header">
          <div className="terminal-header-glow"></div>
          <div className="terminal-dots">
            <motion.div className="dot red" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} />
            <motion.div
              className="dot yellow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="dot green"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <div className="terminal-title">
            <Terminal size={18} />
            <span className="typewriter-text">terminal ~/portfolio/developer-profile</span>
            <Sparkles size={14} className="sparkle-icon" />
          </div>
          <div className="connection-status">
            <motion.div
              className="status-indicator"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>{t("connected")}</span>
          </div>
        </div>

        <div className="navigation-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="terminal-content" ref={terminalRef}>
          <motion.div
            className="command-line"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="prompt">visitor@portfolio:~$</span>
            <span className="command">cat developer-profile</span>
            <span className={`cursor ${cursorVisible ? "visible" : ""}`}>▊</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                className="tab-content profile-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="profile-header">
                  <motion.div
                    className="avatar-container"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="avatar-glow"></div>
                    <div className="avatar">
                      <Code2 size={32} />
                    </div>
                  </motion.div>
                  <div className="profile-info">
                    <h3 className="developer-name">
                      {profileData.profile.name}
                      <motion.span
                        className="wave-hand"
                        animate={{ rotate: [0, 20, 0, -20, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                      >
                        👋
                      </motion.span>
                    </h3>
                    <p className="developer-title">{profileData.profile.job}</p>
                    <div className="status-badge">
                      <div className="status-dot"></div>
                      <span>{profileData.profile.status}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-details">
                  {[
                    { icon: MapPin, label: "Location", value: profileData.profile.location },
                    { icon: Briefcase, label: "Experience", value: profileData.profile.experience },
                    {
                      icon: Mail,
                      label: "Email",
                      value: profileData.profile.email,
                      action: handleCopyEmail,
                    },
                    { icon: Heart, label: "Passion", value: "Clean Code & UX" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="detail-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 243, 255, 0.2)" }}
                    >
                      <div className="detail-icon">
                        <item.icon size={16} />
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">{item.label}</span>
                        <div className="detail-value-wrapper">
                          <span className="detail-value">{item.value}</span>
                          {item.action && (
                            <motion.button
                              className="copy-button"
                              onClick={item.action}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Copy"
                            >
                              {copied ? <Check size={12} /> : <Copy size={12} />}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="bio-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4>{t("title")}</h4>
                  <p className="bio-text">{profileData.profile.bio}</p>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
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
                  {Object.entries(profileData.skills).map(([category, skills], categoryIndex) => (
                    <motion.div
                      key={category}
                      className="skill-category"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                    >
                      <div className="category-header">
                        {getCategoryIcon(category)}
                        <h4 className="category-title">{category}</h4>
                      </div>
                      <div className="skills-list">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            className={`skill-item ${hoveredSkill === skill ? "hovered" : ""}`}
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
                            <div className="skill-name">{skill}</div>
                            <motion.div
                              className="skill-progress"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                                duration: 0.8,
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {hoveredSkill && (
                    <motion.div
                      className="skill-details-panel"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <h4>{hoveredSkill}</h4>
                      <p>Advanced proficiency • 4+ years experience</p>
                      <div className="skill-tags">
                        <span>React Ecosystem</span>
                        <span>TypeScript</span>
                        <span>Modern Web</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Contact Tab Content */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                className="tab-content contact-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-header">
                  <h3>{t("ctaButton")}</h3>
                  <p className="contact-subtitle">{t("letsBuild")}</p>
                </div>

                <div className="contact-options">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      value: profileData.contact.email,
                      action: handleCopyEmail,
                      color: "#FF6B6B",
                    },
                    {
                      icon: Github,
                      title: "GitHub",
                      value: profileData.contact.github,
                      link: `https://${profileData.contact.github}`,
                      color: "#6B7280",
                    },
                    {
                      icon: Linkedin,
                      title: "LinkedIn",
                      value: profileData.contact.linkedin,
                      link: `https://${profileData.contact.linkedin}`,
                      color: "#0A66C2",
                    },
                    {
                      icon: Globe,
                      title: t("new"),
                      value: profileData.contact.website,
                      color: "#10B981",
                    },
                  ].map((option, index) => (
                    <motion.a
                      key={option.title}
                      className="contact-card"
                      href={option.link || "#"}
                      target={option.link ? "_blank" : undefined}
                      rel={option.link ? "noopener noreferrer" : undefined}
                      onClick={!option.link ? option.action : undefined}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -8,
                        boxShadow: `0 15px 40px ${option.color}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="contact-icon"
                        style={{ backgroundColor: `${option.color}20`, color: option.color }}
                      >
                        <option.icon size={20} />
                      </div>
                      <div className="contact-content">
                        <h4>{option.title}</h4>
                        <p>{option.value}</p>
                        {option.title === "Email" && (
                          <motion.button
                            className="contact-action"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCopyEmail();
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {copied ? "Copied!" : "Copy Email"}
                          </motion.button>
                        )}
                      </div>
                      <ChevronRight size={16} className="chevron-icon" />
                    </motion.a>
                  ))}
                </div>

                <div className="contact-cta">
                  <p>{t("interestedIn")}</p>
                  <motion.button
                    className="cta-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyEmail}
                  >
                    <Mail size={16} />
                    {t("sendMessage")}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="terminal-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="footer-content">
              <span className="path">~/portfolio</span>
              <div className="footer-info">
                <span className="file-count">3 {t("files")}</span>
                <span className="last-updated">{t("updated")}</span>
              </div>
            </div>
            <div className="cursor-line">
              <span className="prompt">$</span>
              <span className="cursor-blinking">▊</span>
            </div>
          </motion.div>
          <CVSection />
        </div>
      </div>
    </motion.div>
  );
};
