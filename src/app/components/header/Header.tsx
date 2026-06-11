"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Mail } from "lucide-react";

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

  const links = [
    { href: "/about", label: t("about") },
    { href: "/travels", label: t("travels") },
    { href: "/hobbies", label: t("hobbies") },
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
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

        {/* Mobile menu */}
        <nav
          className={`mobile-menu ${open ? "show" : ""}`}
          aria-label="Mobile navigation"
          aria-hidden={!open}
        >
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
      </header>

      {/* Overlay for mobile menu */}
      {open && <div className="header-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

      {/* Contact Modal */}
      <ContactModal />
    </>
  );
}
