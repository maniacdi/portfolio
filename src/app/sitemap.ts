import { MetadataRoute } from "next";

import { SERVICE_PAGES, servicePath } from "@/app/data/services";
import { fetchProjects } from "@/app/services/projectsService";
import { getPost, getPostSlugs } from "@/utils/blog";

const BASE_URL = "https://javimagaldi.com";

// Stable lastmod for static pages (home/about/code/travels/hobbies/…).
// Bump this ONLY when those pages get a meaningful content change.
// Blog posts and projects derive their own dates below.
const SITE_LAST_UPDATED = "2026-10-05";

type Entry = { path: string; lastmod: string; priority: number };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["/", "/about", "/code", "/travels", "/hobbies", "/projects", "/blog"];
  // Indexable but low priority: they must be findable, not compete for ranking.
  const legalPages = ["/legal", "/privacy", "/cookies"];

  const projects = await fetchProjects();
  const postSlugs = getPostSlugs();

  const entries: Entry[] = [
    ...staticPages.map((path) => ({
      path,
      lastmod: SITE_LAST_UPDATED,
      priority: path === "/" ? 1.0 : 0.8,
    })),
    // Service landing pages: the ones meant to bring clients from search.
    ...SERVICE_PAGES.map((s) => ({
      path: servicePath(s.slug),
      lastmod: SITE_LAST_UPDATED,
      priority: 0.9,
    })),
    ...legalPages.map((path) => ({
      path,
      lastmod: SITE_LAST_UPDATED,
      priority: 0.3,
    })),
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      // API only exposes year granularity; fall back to site date if absent.
      lastmod: p.year ? `${p.year}-01-01` : SITE_LAST_UPDATED,
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      // Real publish date from the post frontmatter (YYYY-MM-DD).
      lastmod: getPost(slug, "es")?.meta.date || SITE_LAST_UPDATED,
      priority: 0.6,
    })),
  ];

  // Both language versions get their own <url>: each is its own canonical
  // (the English page canonicalises to /en/...), and listing only the Spanish
  // one left the English URLs to be discovered through hreflang alone.
  return entries.flatMap(({ path, lastmod, priority }) => {
    const esUrl = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
    const enUrl = path === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${path}`;
    const alternates = {
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    };

    return [esUrl, enUrl].map((url) => ({
      url,
      lastModified: lastmod,
      changeFrequency: "monthly" as const,
      priority,
      alternates,
    }));
  });
}
