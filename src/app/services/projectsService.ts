import { FEATURED_PROJECTS } from "@/app/data/projects";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://portfolio-backend-azure-one.vercel.app";

// Revalidate (ISR) so pages are pre-rendered and survive API downtime.
const REVALIDATE = 3600;

export interface LocalizedText {
  es?: string;
  en?: string;
}

export interface ApiProject {
  _id?: string;
  slug: string;
  title: string;
  category: "web" | "mobile" | "game";
  status?: "production" | "development" | "daily";
  tagline?: LocalizedText;
  summary?: LocalizedText;
  problem?: LocalizedText;
  solution?: LocalizedText;
  stack?: string[];
  demo?: string;
  repo?: string;
  coverImage?: string;
  images?: string[];
  year?: number;
  seo?: { title?: LocalizedText; description?: LocalizedText; keywords?: string[] };
}

export function localize(text: LocalizedText | undefined, locale: string): string {
  if (!text) return "";
  return (locale === "en" ? text.en : text.es) || text.es || text.en || "";
}

/** Build a minimal ApiProject from the local fallback data (no rich problem/solution). */
function localFallback(): ApiProject[] {
  return FEATURED_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    status: p.status,
    stack: p.tags,
    demo: p.demo,
    repo: p.repo,
    coverImage: p.image,
    images: p.image ? [p.image] : [],
  }));
}

export async function fetchProjects(): Promise<ApiProject[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { next: { revalidate: REVALIDATE } });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && Array.isArray(data.data) && data.data.length) {
        return data.data as ApiProject[];
      }
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
  return localFallback();
}

export async function fetchProjectBySlug(slug: string): Promise<ApiProject | null> {
  try {
    const res = await fetch(`${API_URL}/api/projects/slug/${slug}`, {
      next: { revalidate: REVALIDATE },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data.data) return data.data as ApiProject;
    }
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
  }
  // Fallback to local data if API is unavailable
  return localFallback().find((p) => p.slug === slug) ?? null;
}

export async function fetchProjectSlugs(): Promise<string[]> {
  const projects = await fetchProjects();
  return projects.map((p) => p.slug);
}
