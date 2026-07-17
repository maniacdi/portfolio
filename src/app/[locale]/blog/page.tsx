import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ArrowUpRight, Calendar } from "lucide-react";

import { getAllPosts } from "@/utils/blog";
import { pageMetadata } from "@/utils/seo";
import LocalizedLink from "@components/common/LocalizedLink";

import "@/styles/page.scss";
import "./blog.scss";

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
          {posts.map((post) => {
            const dateLabel = post.date
              ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(post.date))
              : "";
            return (
              <LocalizedLink key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-media">
                  {post.cover ? (
                    <Image src={post.cover} alt={post.title} fill sizes="(max-width: 700px) 100vw, 380px" />
                  ) : (
                    <div className="blog-card-placeholder">
                      <span>{post.tags[0] ?? "Blog"}</span>
                    </div>
                  )}
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    {dateLabel && (
                      <span className="blog-date">
                        <Calendar size={13} />
                        {dateLabel}
                      </span>
                    )}
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <span className="blog-card-go">
                    {t("readMore")}
                    <ArrowUpRight size={15} />
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
