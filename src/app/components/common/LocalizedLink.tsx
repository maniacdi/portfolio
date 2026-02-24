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

    // Build the localized href
    const localizedHref = (() => {
      // If href already starts with a locale, don't add it again
      if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
        return href;
      }

      // Handle root path
      if (href === "/") {
        return `/${locale}`;
      }

      // Handle external URLs
      if (href.startsWith("http://") || href.startsWith("https://")) {
        return href;
      }

      // Handle anchor links
      if (href.startsWith("#")) {
        return href;
      }

      // Add locale to path
      return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
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
