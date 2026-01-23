"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { FileText, Download, Eye, Terminal } from "lucide-react";
import { cvService } from "@/app/services/cvService";
import "./CVSection.scss";

export default function CVSection() {
  const t = useTranslations("about");

  const locale = useLocale() as "es" | "en";
  const [cvUrls, setCvUrls] = useState<{ es: string; en: string } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"es" | "en">(locale);
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
      await cvService.downloadCV(selectedLang);
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
    <section className="cv-section">
      <div className="cv-header">
        <Terminal className="terminal-icon" />
        <h2 className="cv-title">/usr/bin/cv</h2>
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
      </div>

      <div className="cv-control-panel">
        <div className="panel-header">
          <FileText className="panel-icon" />
          <h3>{t("cvManager")}</h3>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn preview-btn"
            onClick={handlePreview}
            disabled={isLoading || !cvUrls}
          >
            <Eye />
            {t("previewCv")}
          </button>
          <button
            className="action-btn download-btn"
            onClick={handleDownload}
            disabled={isLoading || !cvUrls}
          >
            <Download />
            {isLoading ? t("loadingCv") : t("downloadCvButton")}
          </button>
        </div>
      </div>

      {isPreviewOpen && cvUrls && cvUrls[selectedLang] && (
        <div className="cv-preview-modal">
          <div className="modal-overlay" onClick={() => setIsPreviewOpen(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {t("previewCv")} - {selectedLang.toUpperCase()}
              </h3>
              <button className="close-btn" onClick={() => setIsPreviewOpen(false)}>
                ✕
              </button>
            </div>
            <iframe
              src={`${cvUrls[selectedLang]}#view=fitH`}
              className="pdf-viewer"
              title={`CV ${selectedLang.toUpperCase()} Preview`}
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
