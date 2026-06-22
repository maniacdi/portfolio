import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

// Server-only blog reader. Posts live in src/content/blog/<slug>/<locale>.md
const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  tags: string[];
  cover?: string;
  relatedProject?: string;
  locale: string;
}

export interface Post {
  meta: PostMeta;
  content: string; // raw markdown body
}

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

export function getPostSlugs(): string[] {
  return safeReadDir(BLOG_DIR).filter((name) => {
    try {
      return fs.statSync(path.join(BLOG_DIR, name)).isDirectory();
    } catch {
      return false;
    }
  });
}

// Read a post for a locale; fall back to the other locale if missing.
export function getPost(slug: string, locale: string): Post | null {
  const dir = path.join(BLOG_DIR, slug);
  const order = locale === "en" ? ["en", "es"] : ["es", "en"];

  for (const loc of order) {
    const file = path.join(dir, `${loc}.md`);
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        meta: {
          slug,
          title: data.title ?? slug,
          date: data.date ? String(data.date).slice(0, 10) : "",
          excerpt: data.excerpt ?? "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          cover: data.cover,
          relatedProject: data.relatedProject,
          locale: loc,
        },
        content,
      };
    }
  }
  return null;
}

export function getAllPosts(locale: string): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug, locale)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
