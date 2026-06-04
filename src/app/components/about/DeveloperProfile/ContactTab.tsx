"use client";

import { motion } from "framer-motion";
import { ChevronRight,Github, Globe, Linkedin, Mail } from "lucide-react";

import type { ProfileData } from "@/utils/data/profileData";
import { useContactModalStore } from "@/app/store/useContactModalStore";

interface ContactTabProps {
  data: ProfileData["contact"];
  onCopyEmail: () => void;
  copied: boolean;
  t: any;
}

export const ContactTab = ({ data, onCopyEmail, copied, t }: ContactTabProps) => {

  const openContactModal = useContactModalStore((state) => state.open);

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      value: data.email,
      action: onCopyEmail,
      color: "#FF6B6B",
      ariaLabel: "Copy email address",
    },
    {
      icon: Github,
      title: "GitHub",
      value: data.github,
      link: `https://${data.github}`,
      color: "#6B7280",
      ariaLabel: "Visit GitHub profile",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: data.linkedin,
      link: `https://${data.linkedin}`,
      color: "#0A66C2",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      icon: Globe,
      title: t("new"),
      value: t("soon"),
      color: "#10B981",
      ariaLabel: "Personal website coming soon",
    },
  ];

  return (
    <motion.div
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
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          const isExternal = !!option.link;
          const Element = isExternal ? motion.a : motion.button;

          return (
            <Element
              key={option.title}
              className="contact-card"
              href={option.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={!isExternal ? option.action : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: `0 15px 40px ${option.color}40`,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={option.ariaLabel}
            >
              <div
                className="contact-icon"
                style={{
                  backgroundColor: `${option.color}20`,
                  color: option.color,
                }}
                aria-hidden="true"
              >
                <Icon size={20} />
              </div>

              <div className="contact-content">
                <h4>{option.title}</h4>
                <p>{option.value}</p>
                {option.title === "Email" && (
                  <span className="contact-action-text">
                    {copied ? `✓ ${t("copied")}` : t("clickToCopy")}
                  </span>
                )}
              </div>

              <ChevronRight size={16} className="chevron-icon" aria-hidden="true" />
            </Element>
          );
        })}
      </div>

      <div className="contact-cta">
        <p>{t("interestedIn")}</p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openContactModal}
          aria-label="Open contact form"
        >
          <Mail size={16} />
          {t("sendMessage")}
        </motion.button>
      </div>
    </motion.div>
  );
};
