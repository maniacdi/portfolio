"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import "./CareerTimeline.scss";

export interface CareerItem {
  kind: "work" | "education";
  start: number;
  /** null = current position */
  end: number | null;
  title: string;
  org: string;
  location: string;
  description?: string;
  tags?: string[];
}

interface CareerTimelineProps {
  items: CareerItem[];
}

/**
 * One rail, newest first, read like a `git log`: the period on the left, the
 * marker on the rail and the detail on the right. Work is a circle, education
 * a square; the current job is the only filled marker.
 */
export const CareerTimeline: FC<CareerTimelineProps> = ({ items }) => {
  const t = useTranslations("about");

  return (
    <section className="career" aria-labelledby="career-title">
      <header className="career-head">
        <h2 id="career-title" className="career-title">
          {t("careerTitle")}
        </h2>
        <p className="career-sub">{t("careerSub")}</p>
      </header>

      <ol className="career-list">
        {items.map((item) => {
          const current = item.end === null;
          const period = `${item.start} — ${current ? t("present") : item.end}`;

          return (
            <li
              key={`${item.kind}-${item.start}`}
              className={`career-item career-item--${item.kind}${current ? " is-current" : ""}`}
            >
              <div className="career-when">
                <span className="career-period">{period}</span>
                <span className="career-kind">
                  {item.kind === "work" ? t("kindWork") : t("kindEducation")}
                </span>
              </div>

              <div className="career-rail" aria-hidden="true">
                <span className="career-marker" />
              </div>

              <div className="career-body">
                <span className="career-period career-period--inline">{period}</span>
                <h3 className="career-role">{item.title}</h3>
                <p className="career-org">
                  {item.org}
                  <span className="career-location">{item.location}</span>
                </p>
                {item.description && <p className="career-desc">{item.description}</p>}
                {item.tags && item.tags.length > 0 && (
                  <ul className="career-tags" aria-label={t("careerTags")}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
