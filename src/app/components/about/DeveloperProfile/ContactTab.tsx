"use client";

import { motion } from "framer-motion";
import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";
import type { ProfileData } from "@/utils/data/profileData";

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
      ariaLabel: "Copy email address",
    },
    {
      icon: Github,
      title: "GitHub",
      value: data.github,
      link: `https://${data.github}`,
      ariaLabel: "Visit GitHub profile",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: data.linkedin,
      link: `https://${data.linkedin}`,
      ariaLabel: "Visit LinkedIn profile",
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
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              aria-label={option.ariaLabel}
            >
              <div className="contact-icon" aria-hidden="true">
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
          onClick={() => openContactModal()}
          aria-label="Open contact form"
        >
          <Mail size={16} />
          {t("sendMessage")}
        </motion.button>
      </div>
    </motion.div>
  );
};
