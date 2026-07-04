import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
const BASE_URL = "https://javimagaldi.com";

// Static routes
const pages = ["/", "/about", "/code", "/travels", "/hobbies"];
const locales = ["es", "en"];

return pages.map((route) => ({
    url: route === "/" ? BASE_URL : `${BASE_URL}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        es: route === "/" ? BASE_URL : `${BASE_URL}${route}`,
        en: route === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${route}`,
      },
    },
  }));
}
