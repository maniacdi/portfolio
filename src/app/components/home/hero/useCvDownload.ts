"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

import { cvService } from "@/app/services/cvService";

/** Download state for the hero CV button, shared by the hero variants. */
export function useCvDownload() {
  const locale = useLocale() as "es" | "en";
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async () => {
    setIsDownloading(true);
    try {
      await cvService.downloadCV(locale);
    } catch (error) {
      console.error("Error downloading CV:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, download };
}
