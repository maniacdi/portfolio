import { MetadataRoute } from "next";

import { fetchProjectSlugs } from "@/app/services/projectsService";
import { getPostSlugs } from "@/utils/blog";

const BASE_URL = "https://javimagaldi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/about", "/code", "/travels", "/hobbies", "/projects", "/blog"];

  const slugs = await fetchProjectSlugs();
  const postSlugs = getPostSlugs();

  const allPages = [
    ...pages,
    ...slugs.map((slug) => `/projects/${slug}`),
    ...postSlugs.map((slug) => `/blog/${slug}`),
  ];

  return allPages.map((page) => {
    const esUrl = page === "/" ? BASE_URL : `${BASE_URL}${page}`;
    const enUrl = page === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${page}`;

    return {
      url: esUrl, // canónica siempre la española (sin prefijo)
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1.0 : page.startsWith("/projects/") ? 0.7 : page.startsWith("/blog/") ? 0.6 : 0.8,
      alternates: {
        languages: {
          es: esUrl,
          en: enUrl,
          "x-default": esUrl,
        },
      },
    };
  });
}