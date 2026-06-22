import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import LocalizedLink from "@components/common/LocalizedLink";
import { getPost, getPostSlugs } from "@/utils/blog";

import "@/styles/page.scss";
import "../blog.scss";

const BASE_URL = "https://javimagaldi.com";
const LOCALES = ["es", "en"] as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getPostSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const isEs = locale === "es";
  const path = `/blog/${slug}`;
  const canonical = isEs ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const image = post.meta.cover ? `${BASE_URL}${post.meta.cover}` : `${BASE_URL}/images/og-image.jpg`;

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.meta.date,
      images: [{ url: image, width: 1200, height: 630, alt: post.meta.title }],
    },
    twitter: { card: "summary_large_image", title: post.meta.title, description: post.meta.excerpt, images: [image] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const { meta, content } = post;
  const dateLabel = meta.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(meta.date))
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    url: `${BASE_URL}${locale === "es" ? "" : "/en"}/blog/${slug}`,
    image: meta.cover ? `${BASE_URL}${meta.cover}` : undefined,
    keywords: meta.tags.join(", "),
    author: { "@type": "Person", name: "Javi García Magaldi", url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}${locale === "es" ? "" : "/en"}/blog/${slug}`,
  };

  return (
    <main className="page-container blog-post">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LocalizedLink href="/blog" className="blog-back">
        <ArrowLeft size={16} />
        <span>{t("back")}</span>
      </LocalizedLink>

      <header className="blog-post-head">
        <div className="blog-post-meta">
          {dateLabel && (
            <span className="blog-date">
              <Calendar size={14} />
              {dateLabel}
            </span>
          )}
          {meta.tags.map((tag) => (
            <span key={tag} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="blog-post-title">{meta.title}</h1>
      </header>

      {meta.cover && (
        <div className="blog-post-cover">
          <Image src={meta.cover} alt={meta.title} fill sizes="(max-width: 800px) 100vw, 800px" priority />
        </div>
      )}

      <article className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      {meta.relatedProject && (
        <LocalizedLink href={`/projects/${meta.relatedProject}`} className="blog-related">
          <span>{t("relatedProject")}</span>
          <ArrowUpRight size={16} />
        </LocalizedLink>
      )}
    </main>
  );
}
