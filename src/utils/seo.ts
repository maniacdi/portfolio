import type { Metadata } from "next";

export const BASE_URL = "https://javimagaldi.com";
const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;

interface PageSeo {
  locale: string;
  /** Route path without locale prefix, e.g. "/about". Empty string for home. */
  path: string;
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
  const esUrl = `${BASE_URL}${path}`;
  const enUrl = `${BASE_URL}/en${path}`;
  const canonical = isEs ? esUrl : enUrl;

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
      siteName: "Magaldidev",
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_ES",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@magaldidev",
      creator: "@magaldidev",
      images: [OG_IMAGE],
    },
  };
}
