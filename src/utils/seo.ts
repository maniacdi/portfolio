import type { Metadata } from "next";

export const BASE_URL = "https://javimagaldi.com";

/** Brand shown in titles, social cards and structured data. */
export const SITE_NAME = "Javi Magaldi";

/** Site-wide social card, one per language (the card carries text). */
export function ogImage(locale: string) {
  return `${BASE_URL}/images/${locale === "en" ? "og-card-en" : "og-card"}.jpg`;
}

interface PageSeo {
  locale: string;
  /**
   * Route path without locale prefix, e.g. "/about". Empty string for home.
   * An object when the page has a different slug per language (services).
   */
  path: string | { es: string; en: string };
  title: string;
  description: string;
}

/**
 * Metadata for static pages: canonical + hreflang + page-specific
 * Open Graph and Twitter cards. Next.js does not deep-merge the
 * openGraph/twitter blocks from the locale layout, so each page must
 * provide the full block or social previews fall back to the site-wide
 * generic title.
 */
export function pageMetadata({ locale, path, title, description }: PageSeo): Metadata {
  const isEs = locale === "es";
  const paths = typeof path === "string" ? { es: path, en: path } : path;
  const esUrl = `${BASE_URL}${paths.es}`;
  const enUrl = `${BASE_URL}/en${paths.en}`;
  const canonical = isEs ? esUrl : enUrl;
  const image = ogImage(locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_ES",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@magaldidev",
      creator: "@magaldidev",
      images: [image],
    },
  };
}
