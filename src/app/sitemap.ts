import { MetadataRoute } from "next";



export default function sitemap(): MetadataRoute.Sitemap {
const BASE_URL = "https://javimagaldi.com";

// Static routes
const pages = ["/", "/about", "/code", "/travels", "/hobbies"];
const locales = ["es", "en"];

return locales.flatMap((locale) =>
  pages.map((page) => ({
    url: `${BASE_URL}/${locale}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1.0 : 0.8,
  }))
);
}
