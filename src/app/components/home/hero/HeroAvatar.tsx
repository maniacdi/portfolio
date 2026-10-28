"use client";

import { useEffect, useRef, useState } from "react";
import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import { useTranslations } from "next-intl";

import "./HeroAvatar.scss";

// Only for the damage numbers, so it never competes with the LCP.
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  variable: "--font-pixel",
});

// How long the kick pose stays, and when the next bug crawls back in.
const KICK_MS = 700;
const RESPAWN_MS = 2200;
const CRIT_CHANCE = 0.35;

type BugPhase = "crawl" | "fly" | "respawn";

/**
 * Voxel me on the WASD keys. Hover (or tap / Enter) swaps to the kick pose,
 * the bug flies off and an RPG-style "-1 BUG" pops up.
 */
export default function HeroAvatar() {
  const t = useTranslations("heroNext.avatar");
  const [kicking, setKicking] = useState(false);
  const [bug, setBug] = useState<BugPhase>("crawl");
  const [hits, setHits] = useState(0);
  const [crit, setCrit] = useState(false);
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const kick = () => {
    if (busy.current) return;
    busy.current = true;
    setKicking(true);
    setBug("fly");
    setCrit(Math.random() < CRIT_CHANCE);
    setHits((n) => n + 1);
    timers.current = [
      setTimeout(() => setKicking(false), KICK_MS),
      setTimeout(() => {
        setBug("respawn");
        busy.current = false;
      }, RESPAWN_MS),
    ];
  };

  return (
    <div className={`hero-avatar ${pixelFont.variable}`}>
      <button
        type="button"
        className={`hero-avatar-stage${kicking ? " is-kicking" : ""}`}
        onMouseEnter={kick}
        onClick={kick}
        aria-label={t("kick")}
      >
        <span className="hero-avatar-aura" aria-hidden="true" />
        <span className="hero-avatar-pool" aria-hidden="true" />
        <Image
          className="hero-avatar-img hero-avatar-img--idle"
          src="/images/hero/avatar-idle.webp"
          alt=""
          width={577}
          height={760}
          priority
          sizes="320px"
        />
        <Image
          className="hero-avatar-img hero-avatar-img--kick"
          src="/images/hero/avatar-kick.webp"
          alt=""
          width={577}
          height={760}
          sizes="320px"
        />
        <svg
          className={`hero-avatar-bug is-${bug}`}
          viewBox="0 0 8 6"
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          <g fill="#3ddc5f">
            <rect x="2" y="1" width="4" height="4" />
            <rect x="0" y="2" width="2" height="1" />
            <rect x="6" y="2" width="2" height="1" />
            <rect x="1" y="4" width="1" height="2" />
            <rect x="6" y="4" width="1" height="2" />
            <rect x="3" y="0" width="2" height="1" />
          </g>
          <rect x="2" y="2" width="1" height="1" fill="#0a0a12" />
        </svg>
        {hits > 0 && (
          <span key={hits} className="hero-avatar-dmg" aria-hidden="true">
            {t("damage")}
          </span>
        )}
        {hits > 0 && crit && (
          <span
            key={`crit-${hits}`}
            className="hero-avatar-dmg hero-avatar-dmg--crit"
            aria-hidden="true"
          >
            {t("critical")}
          </span>
        )}
      </button>
      <p className="hero-avatar-counter" aria-live="polite">
        {t("counter", { count: hits })}
      </p>
    </div>
  );
}
