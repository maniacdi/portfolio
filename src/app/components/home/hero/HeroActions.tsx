"use client";

import { useTranslations } from "next-intl";

import { Download } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";

import { useCvDownload } from "./useCvDownload";

/** The three hero actions, same wording and targets in every variant. */
export default function HeroActions({ className = "" }: { className?: string }) {
  const t = useTranslations("hero");
  const openContactModal = useContactModalStore((s) => s.open);
  const { isDownloading, download } = useCvDownload();

  return (
    <div className={`hero-cta ${className}`}>
      <a href="#proyectos" className="hero-cta-primary">
        {t("seeProjects")}
      </a>
      <button type="button" className="hero-cta-secondary" onClick={() => openContactModal()}>
        {t("ctaPrimary")}
      </button>
      <button
        type="button"
        className="hero-cta-text"
        onClick={download}
        disabled={isDownloading}
      >
        <Download size={16} aria-hidden="true" />
        {isDownloading ? t("downloadingCv") : t("downloadCv")}
      </button>
    </div>
  );
}
