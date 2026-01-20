"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LocalizedLink from "@components/common/LocalizedLink";
import LanguageSwitcher from "@/app/components/header/LanguageSwitcher/LanguageSwitcher";
import { usePathname } from "next/navigation";

import "./Header.scss";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/about", label: t("about") },
    { href: "/travels", label: t("travels") },
    { href: "/hobbies", label: t("hobbies") },
  ];

  return (
    <header className={`header-container ${open ? "menu-open" : ""}`}>
      <div className="header-content">
        <LocalizedLink href="/">
          <img className="logo" src="/images/LOGO.png" alt="Magaldidev" />
        </LocalizedLink>

        {/* Burger */}
        <button
          className={`burger ${open ? "active" : ""}`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop nav */}
        <nav className="nav-links">
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

        <LanguageSwitcher />
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        {links.map(({ href, label }) => (
          <LocalizedLink key={href} href={href} className={pathname.endsWith(href) ? "active" : ""}>
            <span onClick={() => setOpen(false)}>{label}</span>
          </LocalizedLink>
        ))}

        <LanguageSwitcher />
      </div>
    </header>
  );
}
