"use client";

import { FC, KeyboardEvent, useCallback, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatePresence, MotionConfig } from "framer-motion";

import { useClipboard } from "@/app/hooks/useClipboard";
import { profileData } from "@/utils/data/profileData";

import CVSection from "../../cv/CVSection";

import { ContactTab } from "./ContactTab";
import { ProfileTab } from "./ProfileTab";
import { SkillsTab } from "./SkillsTab";

import "./DeveloperProfile.scss";

interface DeveloperProfileProps {
  className?: string;
}

type TabType = "profile" | "skills" | "contact";

/**
 * Editorial profile block: photo on one side, name + role + availability and
 * the key facts as a definition list on the other. The bio, skills and contact
 * options sit below in a plain tablist.
 */
export const DeveloperProfile: FC<DeveloperProfileProps> = ({ className }) => {
  const t = useTranslations("about");
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { copied, copyToClipboard } = useClipboard();
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs = useMemo(
    () => [
      { id: "profile" as TabType, label: t("profile") },
      { id: "skills" as TabType, label: t("skillsSection") },
      { id: "contact" as TabType, label: t("contactSection") },
    ],
    [t]
  );

  // The role is the line under the name, so the list holds the other facts.
  const facts = [
    { label: t("location"), value: t("profileLocation") },
    { label: t("experience"), value: t("profileExperience") },
    {
      label: t("email"),
      value: (
        <a href={`mailto:${profileData.profile.email}`} className="dp-fact-link">
          {profileData.profile.email}
        </a>
      ),
    },
  ];

  const handleCopyEmail = useCallback(() => {
    copyToClipboard(profileData.profile.email);
  }, [copyToClipboard]);

  // WAI-ARIA tabs: arrows move between tabs, Home/End jump to the ends.
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const tabId = (id: TabType) => `${baseId}-tab-${id}`;
  const panelId = (id: TabType) => `${baseId}-panel-${id}`;

  return (
    <MotionConfig reducedMotion="user">
      <section className={`developer-profile ${className || ""}`} aria-labelledby={`${baseId}-name`}>
        <div className="dp-identity">
          <div className="dp-photo">
            <Image
              src="/images/avatar.webp"
              alt={profileData.profile.name}
              width={320}
              height={320}
              sizes="(max-width: 720px) 200px, 320px"
              priority
            />
          </div>

          <div className="dp-info">
            <h2 id={`${baseId}-name`} className="dp-name">
              {profileData.profile.name}
            </h2>
            <p className="dp-role">{t("profileJob")}</p>
            <p className="dp-status">
              <span className="dp-status-dot" aria-hidden="true" />
              {t("profileStatus")}
            </p>

            <dl className="dp-facts">
              {facts.map((fact) => (
                <div key={fact.label} className="dp-fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="dp-tabs" role="tablist" aria-label={t("title")}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={tabId(tab.id)}
                aria-selected={isActive}
                aria-controls={panelId(tab.id)}
                tabIndex={isActive ? 0 : -1}
                className={`dp-tab${isActive ? " is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="dp-panel"
          role="tabpanel"
          id={panelId(activeTab)}
          aria-labelledby={tabId(activeTab)}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            {activeTab === "profile" && <ProfileTab key="profile" t={t} />}

            {activeTab === "skills" && <SkillsTab key="skills" data={profileData.skills} t={t} />}

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
        </div>

        <CVSection />
      </section>
    </MotionConfig>
  );
};
