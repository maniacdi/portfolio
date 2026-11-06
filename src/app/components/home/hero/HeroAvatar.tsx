"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  BUG_GOAL,
  readBugsSquashed,
  readFoundEggs,
  unlockEgg,
  writeBugsSquashed,
} from "@components/common/easterEggsProgress";
import { pixelFont } from "@components/common/pixelFont";

import "./HeroAvatar.scss";

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
  // kicks in this visit, so the pop-ups don't replay on load
  const [kicks, setKicks] = useState(0);
  const [crit, setCrit] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // The count survives visits; squashing BUG_GOAL bugs unlocks an easter egg.
  useEffect(() => {
    setHits(readBugsSquashed());
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const kick = () => {
    if (busy.current) return;
    busy.current = true;
    const next = hits + 1;
    setKicking(true);
    setBug("fly");
    setCrit(Math.random() < CRIT_CHANCE);
    setHits(next);
    setKicks((n) => n + 1);
    writeBugsSquashed(next);
    setUnlocked(false);
    // >= so it can be won again after "reset progress" in the eggs panel
    if (next >= BUG_GOAL && !readFoundEggs().includes("bugs")) {
      unlockEgg("bugs");
      setUnlocked(true);
    }
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
          loading="eager"
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
        {kicks > 0 && (
          <span key={kicks} className="hero-avatar-dmg" aria-hidden="true">
            {t("damage")}
          </span>
        )}
        {unlocked && (
          <span
            key={`unlock-${kicks}`}
            className="hero-avatar-dmg hero-avatar-dmg--unlock"
            aria-hidden="true"
          >
            {t("unlocked")}
          </span>
        )}
        {kicks > 0 && crit && (
          <span
            key={`crit-${kicks}`}
            className="hero-avatar-dmg hero-avatar-dmg--crit"
            aria-hidden="true"
          >
            {t("critical")}
          </span>
        )}
      </button>
      <p className="hero-avatar-counter" aria-live="polite">
        {hits < BUG_GOAL
          ? t("counterGoal", { count: hits, goal: BUG_GOAL })
          : t("counter", { count: hits })}
      </p>
    </div>
  );
}
