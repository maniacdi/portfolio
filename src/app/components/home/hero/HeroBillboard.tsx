"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import HeroActions from "./HeroActions";

import "./hero.scss";
import "./HeroBillboard.scss";

/**
 * "Brutalist billboard" hero: the name set as big as the viewport allows,
 * a facts row on top, the pitch and actions underneath, and one moving band
 * of real figures from the CV — the only animation on the page load.
 */
interface HeroBillboardProps {
  /** Chromatic glitch on the name while hovered. Driven by HERO_GLITCH. */
  glitch?: boolean;
}

export default function HeroBillboard({ glitch = false }: HeroBillboardProps) {
  const t = useTranslations("heroNext");
  const facts = t.raw("facts") as string[];
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchProps = glitch
    ? {
        onMouseEnter: () => setIsGlitching(true),
        onMouseLeave: () => setIsGlitching(false),
      }
    : {};
  const glitchClass = isGlitching ? " is-glitching" : "";

  return (
    <section className="hero-billboard" aria-labelledby="hero-name">
      <div className="bb-inner">
        <div className="bb-meta">
          <span>{t("location")}</span>
          <span className="bb-meta-role">{t("role")}</span>
          <span className="bb-meta-status">
            <span className="bb-dot" aria-hidden="true" />
            {t("available")}
          </span>
        </div>

        {/* The poster lines are a layout grid shared with the pitch, so the
            heading itself is the plain name for assistive tech. */}
        <h1 id="hero-name" className="sr-only">
          Javier García Magaldi
        </h1>
        <div className="bb-stage">
          <span
            className={`bb-line bb-line--1${glitchClass}`}
            data-text="Javier García"
            aria-hidden="true"
            {...glitchProps}
          >
            Javier García
          </span>
          <span className="bb-line bb-line--2" aria-hidden="true" {...glitchProps}>
            <span className={`bb-glitch${glitchClass}`} data-text="Magaldi">
              Magaldi
            </span>
            <span className="bb-cursor">_</span>
          </span>
          <p className="bb-lede">{t("lede")}</p>
          <HeroActions className="bb-actions" />
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
