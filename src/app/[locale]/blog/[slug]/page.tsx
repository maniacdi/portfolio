import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import remarkGfm from "remark-gfm";

import { getPost, getPostSlugs, getRelatedPosts } from "@/utils/blog";
import LocalizedLink from "@components/common/LocalizedLink";

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
      // The image comes from opengraph-image.tsx, generated per post.
    },
    twitter: { card: "summary_large_image", title: post.meta.title, description: post.meta.excerpt },
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
  const related = getRelatedPosts(slug, locale);
  const dateLabel = meta.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(meta.date))
    : "";

  const postUrl = `${BASE_URL}${locale === "es" ? "" : "/en"}/blog/${slug}`;
  const blogUrl = `${BASE_URL}${locale === "es" ? "" : "/en"}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    dateModified: meta.date,
    url: postUrl,
    image: `${BASE_URL}/${locale}/blog/${slug}/opengraph-image`,
    keywords: meta.tags.join(", "),
    author: { "@type": "Person", name: "Javi García Magaldi", url: BASE_URL },
    publisher: { "@type": "Person", name: "Javi García Magaldi", url: BASE_URL },
    mainEntityOfPage: postUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: blogUrl },
      { "@type": "ListItem", position: 2, name: meta.title, item: postUrl },
    ],
  };

  return (
    <main className="page-container blog-post">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

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
          <span className="blog-date">
            <Clock size={14} />
            {t("readingTime", { minutes: meta.readingMinutes })}
          </span>
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

      {related.length > 0 && (
        <section className="blog-related-posts" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title">{t("relatedPosts")}</h2>
          <div className="blog-related-list">
            {related.map((post) => (
              <LocalizedLink key={post.slug} href={`/blog/${post.slug}`} className="blog-related-card">
                <span className="blog-related-meta">
                  {post.tags[0] && <span className="blog-tag">{post.tags[0]}</span>}
                  <span className="blog-date">
                    <Clock size={13} />
                    {t("readingTime", { minutes: post.readingMinutes })}
                  </span>
                </span>
                <span className="blog-related-title">{post.title}</span>
                <ArrowUpRight size={16} className="blog-related-arrow" />
              </LocalizedLink>
            ))}
          </div>
        </section>
      )}

      <div className="blog-post-footer">
        {meta.relatedProject && (
          <LocalizedLink href={`/projects/${meta.relatedProject}`} className="blog-related">
            <span>{t("relatedProject")}</span>
            <ArrowUpRight size={16} />
          </LocalizedLink>
        )}
        <LocalizedLink href="/blog" className="blog-back blog-back-bottom">
          <ArrowLeft size={16} />
          <span>{t("allPosts")}</span>
        </LocalizedLink>
      </div>
    </main>
  );
}
