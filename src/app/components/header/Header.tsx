"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Mail, X } from "lucide-react";

import ContactModal from "@/app/components/contact/ContactModal";
import LanguageSwitcher from "@/app/components/header/LanguageSwitcher/LanguageSwitcher";
import { useContactModalStore } from "@/app/store/useContactModalStore";
import LocalizedLink from "@components/common/LocalizedLink";

import ThemeToggle from "../common/ThemeToggle";

import "./Header.scss";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openContactModal } = useContactModalStore();

  // Hobbies hidden from nav (route kept alive in code). Travels relocated to footer + Sobre mí.
  // Servicios/Proyectos are home sections — "/#anchor" navigates home then scrolls from any page.
  const links = [
    { href: "/#servicios", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/code", label: t("code") },
  ];

  // Close menu when clicking on a link
  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent page scroll when menu is open (lock both html and body — html owns
  // the scroll because it has overflow-x: clip, so locking body alone isn't enough)
  useEffect(() => {
    const value = open ? "hidden" : "";
    document.documentElement.style.overflow = value;
    document.body.style.overflow = value;

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleContactClick = useCallback(() => {
    setOpen(false); 
    openContactModal();
  }, []);

  return (
    <>
      <header
        className={`header-container ${open ? "menu-open" : ""} ${scrolled ? "scrolled" : ""}`}
      >
        <div className="header-content">
          <LocalizedLink href="/" onClick={handleLinkClick}>
            <img className="logo" src="/images/LOGO.png" alt="Magaldidev logo" />
          </LocalizedLink>

          <button
            className={`burger ${open ? "active" : ""}`}
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Main navigation">
            {links.map(({ href, label }) => (
              <LocalizedLink
                key={href}
                href={href}
                className={pathname.endsWith(href) ? "active" : ""}
              >
                {label}
              </LocalizedLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="header-actions">
            <button
              className="cta-btn"
              onClick={handleContactClick}
              aria-label="Open contact form"
            >
              <Mail size={16} />
              <span>{t("contact")}</span>
            </button>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered OUTSIDE <header> on purpose: the header has
          backdrop-filter (and a transform when scrolled), which would make this
          position:fixed element anchor to the header instead of the viewport.
          Outside the header it covers the full viewport. */}
      <nav
        className={`mobile-menu ${open ? "show" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Self-contained top bar: logo + close. The menu must not depend on the
            sticky header (which can drop off-screen while scroll is locked). */}
        <div className="mobile-menu-top">
          <LocalizedLink href="/" onClick={handleLinkClick}>
            <img className="menu-logo" src="/images/LOGO.png" alt="Magaldidev logo" />
          </LocalizedLink>
          <button
            className="menu-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-content">
          {links.map(({ href, label }) => (
            <LocalizedLink
              key={href}
              href={href}
              className={pathname.endsWith(href) ? "active" : ""}
              onClick={handleLinkClick}
            >
              {label}
            </LocalizedLink>
          ))}

          <button
            className="cta-btn mobile"
            onClick={handleContactClick}
            aria-label="Open contact form"
          >
            <Mail size={18} />
            <span>{t("contact")}</span>
          </button>

          <div className="mobile-menu-footer">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {open && <div className="header-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

      {/* Contact Modal */}
      <ContactModal />
    </>
  );
}
