"use client";

import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

import "./Footer.scss";

export default function Footer() {
  const t = useTranslations("footer");

  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left - LOGO */}
        <div className="footer-brand">
          <span className="footer-logo">Magaldidev</span>
          <p className="footer-copy">
            © {year} Magaldidev. {t("copyright")}
          </p>
        </div>

        {/* Right - Social links */}
        <div className="footer-socials">
          <a href="https://x.com/Magaldi6" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>

          <a href="https://github.com/maniacdi" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>

          <a href="https://www.instagram.com/magaldi6/" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>

          <a
            href="https://www.linkedin.com/in/javimagaldi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
