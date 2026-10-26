"use client";

import { useTranslations } from "next-intl";

import {
  ArrowUp,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

import { useSignatureUnlocked } from "../common/easterEggsProgress";
import LocalizedLink from "../common/LocalizedLink";
import Logo from "../common/Logo";
import CookiePreferencesButton from "../legal/CookiePreferencesButton";

import "./Footer.scss";

export default function Footer() {
  const t = useTranslations("footer");
  const tLegal = useTranslations("legal");
  // Finding every easter egg swaps the logo for the graffiti tag.
  const signatureUnlocked = useSignatureUnlocked();
  const year = new Date().getFullYear();

  // Required by LSSI-CE art. 10 and RGPD art. 13: reachable from every page.
  const legalLinks = [
    { href: "/legal", label: tLegal("notice") },
    { href: "/privacy", label: tLegal("privacy") },
    { href: "/cookies", label: tLegal("cookies") },
  ];

  // Same order as the header, plus Travels (footer + Sobre mí only).
  // Hobbies stays hidden (route kept alive).
  const quickLinks = [
    { href: "/", label: t("home") },
    { href: "/#servicios", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/code", label: t("code") },
    { href: "/travels", label: t("travels") },
  ];

  const socialLinks = [
    {
      href: "https://github.com/maniacdi",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.instagram.com/magaldi6/",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/in/javimagaldi/",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-divider" />

      <div className="footer-main">
        <div className="footer-content">
          <div className="footer-column footer-brand">
            <div className="brand-header">
              <Logo className="brand-logo" variant={signatureUnlocked ? "tag" : "mono"} />
            </div>

            <p className="brand-tagline">{t("tagline")}</p>

            <div className="brand-info">
              <div className="info-item">
                <MapPin size={16} />
                <span>Santander, {t("country")}</span>
              </div>
              <div className="info-item">
                <Mail size={16} />
                <a href="mailto:magaldi6@gmail.com">magaldi6@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="footer-column footer-links">
            <h3 className="column-title">{t("quickLinks")}</h3>
            <nav className="links-list">
              {quickLinks.map((link) => (
                <LocalizedLink key={link.href} href={link.href} className="footer-link">
                  <span className="link-arrow">→</span>
                  {link.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          <div className="footer-column footer-connect">
            <h3 className="column-title">{t("connect")}</h3>
            <p className="connect-description">{t("connectText")}</p>

            <div className="social-grid">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <nav className="footer-legal" aria-label={tLegal("navLabel")}>
          {legalLinks.map((link) => (
            <LocalizedLink key={link.href} href={link.href} className="footer-legal-link">
              {link.label}
            </LocalizedLink>
          ))}
          <CookiePreferencesButton className="footer-legal-link footer-legal-button" />
        </nav>

        <div className="footer-bottom-content">
          <div className="footer-copyright">
            <span>© {year} Javier García Magaldi</span>
            <span className="separator">•</span>
            <span>{t("copyright") || "All rights reserved"}</span>
          </div>

          <button className="back-to-top" onClick={scrollToTop} aria-label={t("backToTop")}>
            <span>{t("backToTop")}</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="footer-glow" />
    </footer>
  );
}
