"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

import { useContactModalStore } from "@/app/store/useContactModalStore";
import { LOGO_PATHS } from "@components/common/logoPaths";

import HeroActions from "./HeroActions";
import HeroAvatar from "./HeroAvatar";

import "./hero.scss";
import "./HeroBillboard.scss";

/**
 * "Brutalist billboard" hero: a poster headline over a technical grid, the
 * graffiti "magaldi" tag outlined behind it, and the voxel me kicking bugs.
 * One moving band of real figures from the CV closes it.
 */

// "Pulsa <out>start</out>." -> the word in the tags is drawn outlined, and
// pressing it opens the contact form ("I'll handle the rest").
function HeadlineLine({ line, index }: { line: string; index: number }) {
  const t = useTranslations("heroNext");
  const openContactModal = useContactModalStore((s) => s.open);
  const parts = line.split(/<out>(.*?)<\/out>/);
  return (
    <span className="hb-line" style={{ "--i": index } as CSSProperties}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <button
            key={i}
            type="button"
            className="hb-line-out"
            onClick={() => openContactModal()}
            aria-label={t("startLabel")}
          >
            {part}
          </button>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function HeroBillboard() {
  const t = useTranslations("heroNext");
  const facts = t.raw("facts") as string[];
  const headline = t.raw("headline") as string[];
  const { viewBox, text } = LOGO_PATHS.tag;

  return (
    <section className="hero-billboard" aria-labelledby="hero-name">
      <div className="hb-grid" aria-hidden="true" />
      <svg className="hb-tag" viewBox={viewBox} aria-hidden="true" focusable="false">
        <path d={text} pathLength={1} />
      </svg>

      <div className="bb-inner">
        <h1 id="hero-name" className="sr-only">
          Javier García Magaldi — {t("role")}
        </h1>

        <div className="hb-main">
          <p className="hb-headline">
            {headline.map((line, i) => (
              <HeadlineLine key={line} line={line} index={i} />
            ))}
          </p>
          <p className="bb-lede">{t("lede")}</p>
          <HeroActions className="bb-actions" />
        </div>

        <div className="hb-side">
          <dl className="hb-info">
            <div>
              <dt>{t("roleLabel")}</dt>
              <dd>{t("roleShort")}</dd>
            </div>
            <div>
              <dt>{t("locationLabel")}</dt>
              <dd>{t("location")}</dd>
            </div>
            <div>
              <dt>{t("statusLabel")}</dt>
              <dd className="hb-info-status">
                <span className="bb-dot" aria-hidden="true" />
                {t("available")}
              </dd>
            </div>
          </dl>
          <HeroAvatar />
        </div>
      </div>

      {/* Duplicated once so the loop is seamless; the copy is hidden from AT. */}
      <div className="bb-ticker" role="marquee" aria-label={t("factsLabel")}>
        <div className="bb-ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="bb-ticker-list" aria-hidden={copy === 1}>
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
