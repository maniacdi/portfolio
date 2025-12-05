"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Terminal,
  Code,
  Copy,
  Check,
  ChevronRight,
  User,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import "./DeveloperProfile.scss";

interface DeveloperProfileProps {
  className?: string;
}

export const DeveloperProfile: FC<DeveloperProfileProps> = ({ className }) => {
  const t = useTranslations("about");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "contact">("profile");

  // Developer data in JSON-like format
  const profileData = {
    profile: {
      name: "Javi García Magaldi",
      job: "Full-Stack Developer",
      location: "Santander, Spain",
      email: "magaldi6@gmail.com",
      experience: "5+ years",
      bio: "Passionate about creating digital experiences that combine aesthetics with functionality.",
    },
    skills: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express", "MongoDB", "JAVA", "GraphQL"],
      tools: ["Git", "Docker", "Vercel", "Figma", "VS Code"],
      languages: ["JavaScript", "TypeScript", "JAVA", "SQL"],
    },
    contact: {
      email: "magaldi6@gmail.com",
      github: "https://github.com/maniacdi",
      linkedin: "https://www.linkedin.com/in/javimagaldi/",
    },
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTerminalLine = (key: string, value: any, indent: number = 0) => {
    const indentSpaces = "  ".repeat(indent);

    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <div key={key}>
          <span className="line-number">{indentSpaces}</span>
          <span className="json-key">"{key}"</span>
          <span className="json-colon">: </span>
          <span className="json-brace">{"{"}</span>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderTerminalLine(subKey, subValue, indent + 1)
          )}
          <span className="line-number">{indentSpaces}</span>
          <span className="json-brace">{"}"}</span>
          {indent === 0 && <span className="json-comma">,</span>}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key}>
          <span className="line-number">{indentSpaces}</span>
          <span className="json-key">"{key}"</span>
          <span className="json-colon">: </span>
          <span className="json-bracket">[</span>
          <div className="array-items">
            {value.map((item, index) => (
              <div key={index} className="array-item">
                <span className="line-number">{"  ".repeat(indent + 1)}</span>
                <span className="json-string">"{item}"</span>
                {index < value.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
          <span className="line-number">{indentSpaces}</span>
          <span className="json-bracket">]</span>
          {indent === 0 && <span className="json-comma">,</span>}
        </div>
      );
    }

    return (
      <div key={key}>
        <span className="line-number">{indentSpaces}</span>
        <span className="json-key">"{key}"</span>
        <span className="json-colon">: </span>
        <span className="json-string">"{value}"</span>
        {indent === 0 && <span className="json-comma">,</span>}
      </div>
    );
  };

  return (
    <motion.div
      className={`developer-profile ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="terminal-title">
          <Terminal size={16} />
          <span>terminal ~/portfolio/profile.json</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-content">
        {/* Command line */}
        <div className="command-line">
          <span className="prompt">$</span>
          <span className="command">cat profile.json</span>
        </div>

        {/* JSON Output */}
        <div className="json-output">
          <div className="json-object">
            <span className="json-brace">{"{"}</span>

            {/* Profile Section */}
            <div className="json-section">
              <div className="section-header">
                <span className="json-key">"profile"</span>
                <span className="json-colon">: </span>
                <span className="json-brace">{"{"}</span>
              </div>

              <div className="profile-grid">
                <div className="profile-item">
                  <User size={14} />
                  <div>
                    <span className="item-value">{profileData.profile.name}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <Code size={14} />
                  <div>
                    <span className="item-value">{profileData.profile.job}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <MapPin size={14} />
                  <div>
                    <span className="item-value">{profileData.profile.location}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <Mail size={14} />
                  <div>
                    <div className="email-wrapper">
                      <span className="item-value">{profileData.profile.email}</span>
                      <button className="copy-btn" onClick={handleCopyEmail} title="Copy email">
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="profile-item">
                  <Briefcase size={14} />
                  <div>
                    <span className="item-value">{profileData.profile.experience}</span>
                  </div>
                </div>
              </div>

              <div className="section-footer">
                <span className="json-brace">{"}"}</span>
                <span className="json-comma">,</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="json-section">
              <div className="section-header">
                <span className="json-key">"skills"</span>
                <span className="json-colon">: </span>
                <span className="json-brace">{"{"}</span>
              </div>

              <div className="skills-grid">
                {Object.entries(profileData.skills).map(([category, items]) => (
                  <div key={category} className="skill-category">
                    <h4 className="category-title">{category}</h4>
                    <div className="skill-tags">
                      {items.map((skill: string) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-footer">
                <span className="json-brace">{"}"}</span>
                <span className="json-comma">,</span>
              </div>
            </div>

            {/* Contact Section */}
            <div className="json-section">
              <div className="section-header">
                <span className="json-key">"contact"</span>
                <span className="json-colon">: </span>
                <span className="json-brace">{"{"}</span>
              </div>

              <div className="contact-links">
                {Object.entries(profileData.contact).map(([platform, value]) => (
                  <a
                    key={platform}
                    href={platform === "email" ? `mailto:${value}` : `https://${value}`}
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChevronRight size={12} />
                    <span className="link-platform">{platform}:</span>
                    <span className="link-value">{value}</span>
                  </a>
                ))}
              </div>

              <div className="section-footer">
                <span className="json-brace">{"}"}</span>
              </div>
            </div>

            <span className="json-brace">{"}"}</span>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="terminal-footer">
          <span className="prompt">$</span>
          <span className="cursor">|</span>
        </div>
      </div>
    </motion.div>
  );
};
