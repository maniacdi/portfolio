"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Download, Eye, FileText } from "lucide-react";

import { cvService } from "@/app/services/cvService";

import "./CVSection.scss";

export default function CVSection() {
  const t = useTranslations("about");

  const locale = useLocale() as "es" | "en";
  const [cvUrls, setCvUrls] = useState<{ es: string; en: string } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCVUrls();
  }, []);

  const loadCVUrls = async () => {
    try {
      setIsLoading(true);
      const urls = await cvService.getCVUrls();
      setCvUrls(urls);
    } catch (error) {
      console.error("Error loading CV URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await cvService.downloadCV(locale);
    } catch (error) {
      console.error("Error downloading CV:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <section className="cv-section" aria-label={t("cvLabel")}>
      <div className="cv-info">
        <FileText className="cv-icon" size={22} aria-hidden="true" />
        <div>
          <p className="cv-label">{t("cvLabel")}</p>
          <p className="cv-hint">{t("cvHint")}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="action-btn preview-btn"
          onClick={handlePreview}
          disabled={isLoading || !cvUrls}
        >
          <Eye aria-hidden="true" />
          {t("previewCv")}
        </button>
        <button
          className="action-btn download-btn"
          onClick={handleDownload}
          disabled={isLoading || !cvUrls}
        >
          <Download aria-hidden="true" />
          {isLoading ? t("loadingCv") : t("downloadCvButton")}
        </button>
      </div>

      {isPreviewOpen && cvUrls && cvUrls[locale] && (
        <div className="cv-preview-modal">
          <div className="modal-overlay" onClick={() => setIsPreviewOpen(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {t("previewCv")} - {locale.toUpperCase()}
              </h3>
              <button className="close-btn" onClick={() => setIsPreviewOpen(false)}>
                ✕
              </button>
            </div>
            <iframe
              src={`${cvUrls[locale]}#view=fitH`}
              className="pdf-viewer"
              title={`CV ${locale.toUpperCase()} Preview`}
            />
            <div className="modal-actions">
              <button className="modal-download-btn" onClick={handleDownload}>
                <Download /> {t("downloadCvButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
