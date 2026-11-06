"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

/** Swaps the tab title while the visitor is on another tab ("the bug is escaping"). */
export default function AwayTitle() {
  const t = useTranslations("metadata");

  useEffect(() => {
    let saved = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = t("awayTitle");
      } else {
        document.title = saved;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [t]);

  return null;
}
