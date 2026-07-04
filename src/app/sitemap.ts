import { MetadataRoute } from "next";

import { fetchProjectSlugs } from "@/app/services/projectsService";
import { getPostSlugs } from "@/utils/blog";

const BASE_URL = "https://javimagaldi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/about", "/code", "/travels", "/hobbies", "/projects", "/blog"];
  const locales = ["es", "en"];

  const staticEntries = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1.0 : 0.8,
    }))
  );

  // Per-project pages
  const slugs = await fetchProjectSlugs();
  const projectEntries = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Blog posts
  const postSlugs = getPostSlugs();
  const blogEntries = locales.flatMap((locale) =>
    postSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
