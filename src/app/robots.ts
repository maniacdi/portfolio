import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://magaldidev.vercel.app/sitemap.xml",
    host: "https://magaldidev.vercel.app",
  };
}
