import { getTranslations } from "next-intl/server";

import { GitCommitHorizontal } from "lucide-react";

import { getAllPosts, latestPostIn } from "@/utils/blog";
import { getLastCommit, GITHUB_USER } from "@/utils/github";
import LocalizedLink from "@components/common/LocalizedLink";

import AskChips from "./AskChips";

import "./NowStrip.scss";

// "hace 3 días" / "3 days ago", in the largest unit that fits.
function timeAgo(iso: string, locale: string): string {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, "minute");
}

export default async function NowStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "now" });
  const commit = await getLastCommit();
  const post = latestPostIn(getAllPosts(locale), locale);
  const questions = t.raw("questions") as string[];

  return (
    <section className="now-strip" aria-labelledby="now-label">
      <p id="now-label" className="section-label">
        <span>{t("label")}</span>
      </p>

      <div className={`now-grid ${post ? "" : "now-grid--two"}`}>
        <div className="now-cell">
          <span className="now-title">{t("commitTitle")}</span>
          {commit ? (
            <a href={commit.url} target="_blank" rel="noopener noreferrer" className="now-link">
              <span className="now-repo">
                <GitCommitHorizontal size={14} aria-hidden="true" />
                {commit.repo}
              </span>
              {commit.message && <span className="now-main">{commit.message}</span>}
              <time className="now-meta" dateTime={commit.date}>
                {timeAgo(commit.date, locale)}
              </time>
            </a>
          ) : (
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="now-link"
            >
              <span className="now-main">{t("commitFallback")} →</span>
            </a>
          )}
        </div>

        {post && (
          <div className="now-cell">
            <span className="now-title">{t("postTitle")}</span>
            <LocalizedLink href={`/blog/${post.slug}`} className="now-link">
              <span className="now-main now-main--wrap">{post.title}</span>
              <time className="now-meta" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </LocalizedLink>
          </div>
        )}

        <div className="now-cell">
          <span className="now-title">{t("askTitle")}</span>
          <AskChips questions={questions} />
        </div>
      </div>
    </section>
  );
}
