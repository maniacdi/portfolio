import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";

import { getAllPosts } from "@/utils/blog";
import { pageMetadata } from "@/utils/seo";
import LocalizedLink from "@components/common/LocalizedLink";

import "@/styles/page.scss";
import "./blog.scss";

// Re-render once a day so scheduled blog posts show up on their date.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return pageMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <main className="page-container blog-list-page">
      <h1 className="page-title gradient-text">{t("title")}</h1>
      <p className="page-description">{t("subtitle")}</p>

      {posts.length === 0 ? (
        <p className="blog-empty">{t("empty")}</p>
      ) : (
        <div className="blog-list">
          {posts.map((post, index) => {
            const dateLabel = post.date
              ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(post.date))
              : "";
            return (
              <LocalizedLink key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-media">
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      // the first post is the featured, wider card
                      sizes={index === 0 ? "(max-width: 700px) 100vw, 720px" : "(max-width: 700px) 100vw, 380px"}
                      preload={index === 0}
                    />
                  ) : (
                    // No cover: a typographic one with the post's category.
                    <div className="blog-card-placeholder" aria-hidden="true">
                      <span>{post.tags[0] ?? "Blog"}</span>
                    </div>
                  )}
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    {dateLabel && (
                      <span className="blog-date">
                        <Calendar size={13} aria-hidden="true" />
                        {dateLabel}
                      </span>
                    )}
                    <span className="blog-date">
                      <Clock size={13} aria-hidden="true" />
                      {t("readingTime", { minutes: post.readingMinutes })}
                    </span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="blog-card-go">
                    {t("readMore")}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </LocalizedLink>
            );
          })}
        </div>
      )}
    </main>
  );
}
