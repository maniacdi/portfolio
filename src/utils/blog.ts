import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

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
  readingMinutes: number;
}

export interface Post {
  meta: PostMeta;
  content: string; // raw markdown body
}

// ~200 palabras por minuto, lectura técnica en pantalla. Mínimo 1.
const WORDS_PER_MINUTE = 200;

export function readingMinutes(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ") // los bloques de código se escanean, no se leen
    .replace(/[#>*_`~\-|[\]()!]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
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
          readingMinutes: readingMinutes(content),
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

// Último post escrito en ese idioma: getPost cae al otro idioma si falta la
// traducción, y la home no debe enseñar un título en español en /en.
export function latestPostIn(posts: PostMeta[], locale: string): PostMeta | undefined {
  return posts.find((p) => p.locale === locale);
}

// Posts relacionados: los que más etiquetas comparten con el actual; a igualdad,
// el más reciente. Si no comparte ninguna, se rellena con los últimos publicados.
export function getRelatedPosts(slug: string, locale: string, limit = 2): PostMeta[] {
  const current = getPost(slug, locale)?.meta;
  if (!current) return [];

  const tags = new Set(current.tags.map((t) => t.toLowerCase()));
  const others = getAllPosts(locale).filter((p) => p.slug !== slug);

  return others
    .map((post, recency) => ({
      post,
      recency,
      shared: post.tags.filter((t) => tags.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.shared - a.shared || a.recency - b.recency)
    .slice(0, limit)
    .map(({ post }) => post);
}
