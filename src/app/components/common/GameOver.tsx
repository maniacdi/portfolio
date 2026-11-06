"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import LocalizedLink from "./LocalizedLink";
import { pixelFont } from "./pixelFont";

import "./GameOver.scss";

const COUNTDOWN_S = 10;

/**
 * 404 as an arcade "GAME OVER": the voxel me with the bug that got away, and a
 * "Continue?" countdown that takes you home (it can be stopped).
 */
export default function GameOver() {
  const t = useTranslations("gameOver");
  const locale = useLocale();
  const router = useRouter();
  const [seconds, setSeconds] = useState(COUNTDOWN_S);
  const [running, setRunning] = useState(true);
  const home = locale === "es" ? "/" : `/${locale}`;

  useEffect(() => {
    if (!running) return;
    if (seconds === 0) {
      router.push(home);
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [running, seconds, router, home]);

  return (
    <section className={`game-over ${pixelFont.variable}`}>
      <div className="go-grid" aria-hidden="true" />

      <div className="go-inner">
        <div className="go-avatar" aria-hidden="true">
          <span className="go-aura" />
          <Image
            src="/images/hero/avatar-idle.webp"
            alt=""
            width={577}
            height={760}
            sizes="200px"
          />
          <svg className="go-bug" viewBox="0 0 8 6" shapeRendering="crispEdges">
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
        </div>

        <div className="go-copy">
          <h1 className="go-title">{t("title")}</h1>
          <p className="go-code">{t("code")}</p>
          <p className="go-text">{t("text")}</p>

          <div className="go-continue">
            <span className="go-continue-label">{t("continue")}</span>
            <span className="go-count" aria-hidden="true">
              {running ? seconds : "–"}
            </span>
          </div>
          {running && (
            <p className="go-hint">
              {t("continueHint", { seconds })}{" "}
              <button type="button" className="go-cancel" onClick={() => setRunning(false)}>
                {t("cancel")}
              </button>
            </p>
          )}

          <div className="go-actions">
            <LocalizedLink href="/" className="go-btn go-btn--primary">
              ▶ {t("home")}
            </LocalizedLink>
            <LocalizedLink href="/projects" className="go-btn">
              {t("projects")}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
