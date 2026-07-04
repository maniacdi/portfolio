"use client";

import { AnchorHTMLAttributes, forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";

// Combine Next.js Link props with HTML anchor props, excluding conflicting ones
type CombinedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children: React.ReactNode;
  };

// Our component props - href is required as string
interface LocalizedLinkProps extends Omit<CombinedLinkProps, "href"> {
  href: string;
  locale?: string; // Optional: override current locale
}

const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, locale: customLocale, ...props }, ref) => {
    const currentLocale = useLocale();
    const locale = customLocale || currentLocale;

    // Build the localized href.
    // localePrefix "as-needed": default locale (es) has NO prefix, "en" → /en.
    // Prefixing the default locale would produce /es/* URLs that 307-redirect,
    // which Google flags as "Página con redirección" / duplicate content.
    const localizedHref = (() => {
      // External URLs and same-page anchors pass through untouched
      if (href.startsWith("http://") || href.startsWith("https://")) {
        return href;
      }
      if (href.startsWith("#")) {
        return href;
      }

      const prefix = locale === "es" ? "" : `/${locale}`;

      // If href already carries the target prefix, don't double it
      if (prefix && (href === prefix || href.startsWith(`${prefix}/`))) {
        return href;
      }

      // Root path
      if (href === "/") {
        return prefix || "/";
      }

      // Root-relative hash (e.g. "/#servicios") → "/en#servicios" (no trailing
      // slash before the hash, which would itself redirect)
      if (href.startsWith("/#")) {
        return prefix ? `${prefix}${href.slice(1)}` : href;
      }

      // Normal path
      return `${prefix}${href.startsWith("/") ? href : `/${href}`}`;
    })();

    return (
      <Link ref={ref} href={localizedHref} {...props}>
        {children}
      </Link>
    );
  }
);

LocalizedLink.displayName = "LocalizedLink";

export default LocalizedLink;
