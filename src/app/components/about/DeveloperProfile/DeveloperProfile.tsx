"use client";

import { FC, useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code2,
  User,
  Mail,
  Sparkles,
} from "lucide-react";
import { useClipboard } from "@/app/hooks/useClipboard";
import { profileData } from "@/utils/data/profileData";
import { ProfileTab } from "./ProfileTab";
import { SkillsTab } from "./SkillsTab";
import { ContactTab } from "./ContactTab";
import CVSection from "../../cv/CVSection";
import "./DeveloperProfile.scss";

interface DeveloperProfileProps {
  className?: string;
}

type TabType = "profile" | "skills" | "contact";

export const DeveloperProfile: FC<DeveloperProfileProps> = ({ className }) => {
  const t = useTranslations("about");
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { copied, copyToClipboard } = useClipboard();

  const tabs = useMemo(
    () => [
      { id: "profile" as TabType, label: `${t("profile")}.json`, icon: User },
      { id: "skills" as TabType, label: `${t("skillsSection")}.js`, icon: Code2 },
      { id: "contact" as TabType, label: `${t("contactSection")}.md`, icon: Mail },
    ],
    [t]
  );

  const handleCopyEmail = useCallback(() => {
    copyToClipboard(profileData.profile.email);
  }, [copyToClipboard]);

  return (
    <motion.div
      className={`developer-profile ${className || ""}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="profile-card">
        {/* Terminal Header */}
        <header className="terminal-header">
          <div className="terminal-header-glow" aria-hidden="true" />
          
          <div className="terminal-dots" aria-hidden="true">
            <div className="dot red" />
            <div className="dot yellow" />
            <div className="dot green" />
          </div>

          <div className="terminal-title">
            <Terminal size={18} aria-hidden="true" />
            <span className="typewriter-text">
              <span className="desktop-text">terminal ~/portfolio/developer-profile</span>
              <span className="mobile-text">~/dev-profile</span>
            </span>
            <Sparkles size={14} className="sparkle-icon" aria-hidden="true" />
          </div>

          <div className="connection-status" aria-label="Status: Connected">
            <div className="status-indicator" aria-hidden="true" />
            <span>{t("connected")}</span>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="navigation-tabs" aria-label="Profile sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={`tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`View ${tab.id} section`}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Terminal Content */}
        <div className="terminal-content">
          <div className="command-line" aria-label="Terminal command">
            <span className="prompt" aria-hidden="true">visitor@portfolio:~$</span>
            <span className="command">cat developer-profile</span>
            <span className="cursor" aria-hidden="true">▊</span>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <ProfileTab 
                key="profile" 
                data={profileData.profile} 
                t={t}
              />
            )}

            {activeTab === "skills" && (
              <SkillsTab 
                key="skills" 
                data={profileData.skills} 
                t={t}
              />
            )}

            {activeTab === "contact" && (
              <ContactTab
                key="contact"
                data={profileData.contact}
                onCopyEmail={handleCopyEmail}
                copied={copied}
                t={t}
              />
            )}
          </AnimatePresence>

          {/* Terminal Footer */}
          <footer className="terminal-footer">
            <div className="footer-content">
              <span className="path">~/portfolio</span>
              <div className="footer-info">
                <span className="file-count">3 {t("files")}</span>
                <span className="last-updated">{t("updated")}</span>
              </div>
            </div>
            <div className="cursor-line" aria-hidden="true">
              <span className="prompt">$</span>
              <span className="cursor-blinking">▊</span>
            </div>
          </footer>

          <CVSection />
        </div>
      </div>
    </motion.div>
  );
};