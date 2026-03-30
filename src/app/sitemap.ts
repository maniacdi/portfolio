import { MetadataRoute } from "next";

const BASE_URL = "https://javimagaldi.com";

// Static routes
const routes = ["/", "/about", "/code", "/travels", "/hobbies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Spanish (default) — no prefix
    entries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}${route}`,
          en: `${BASE_URL}/en${route === "/" ? "" : route}`,
        },
      },
    });
  }

  return entries;
}
