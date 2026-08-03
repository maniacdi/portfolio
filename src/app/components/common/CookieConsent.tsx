"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";

import { type ConsentValue, useConsentStore } from "../../store/useConsentStore";

import LocalizedLink from "./LocalizedLink";

import "./CookieConsent.scss";

/**
 * Consent banner (RGPD art. 7 + LSSI-CE art. 22.2).
 *
 * Rules baked into the UI, not just the copy:
 * - Accept and reject are one click each, same size, same prominence.
 * - Nothing loads while the decision is pending — see ConsentedTracking.
 * - The decision is revocable: the footer reopens this panel at any time.
 */
export default function CookieConsent() {
  const t = useTranslations("cookieConsent");

  const decided = useConsentStore((s) => s.decided);
  const panelOpen = useConsentStore((s) => s.panelOpen);
  const storedAnalytics = useConsentStore((s) => s.analytics);
  const storedMonitoring = useConsentStore((s) => s.monitoring);
  const acceptAll = useConsentStore((s) => s.acceptAll);
  const rejectAll = useConsentStore((s) => s.rejectAll);
  const save = useConsentStore((s) => s.save);
  const closePanel = useConsentStore((s) => s.closePanel);

  const [hydrated, setHydrated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState<ConsentValue>("denied");
  const [monitoring, setMonitoring] = useState<ConsentValue>("denied");

  // persist() only reads localStorage on the client; rendering before that
  // would flash the banner at users who already decided.
  useEffect(() => setHydrated(true), []);

  // Reopening from the footer must show the choices currently in force.
  useEffect(() => {
    if (!panelOpen) return;
    setAnalytics(storedAnalytics);
    setMonitoring(storedMonitoring);
    setShowDetails(true);
  }, [panelOpen, storedAnalytics, storedMonitoring]);

  const visible = hydrated && (!decided || panelOpen);

  const toggle = (value: ConsentValue): ConsentValue =>
    value === "granted" ? "denied" : "granted";

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="cookie-consent"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.25 }}
        >
          <div className="cookie-consent__inner">
            {panelOpen && (
              <button
                type="button"
                className="cookie-consent__close"
                onClick={closePanel}
                aria-label={t("close")}
              >
                <X size={16} />
              </button>
            )}

            <div className="cookie-consent__head">
              <Cookie size={16} className="cookie-consent__icon" />
              <h2 id="cookie-consent-title" className="cookie-consent__title">
                {t("title")}
              </h2>
            </div>

            <p className="cookie-consent__text">
              {t("body")}{" "}
              <LocalizedLink href="/cookies" className="cookie-consent__link">
                {t("cookiesLink")}
              </LocalizedLink>{" "}
              ·{" "}
              <LocalizedLink href="/privacy" className="cookie-consent__link">
                {t("privacyLink")}
              </LocalizedLink>
            </p>

            {showDetails && (
              <ul className="cookie-consent__options">
                <li className="cookie-consent__option cookie-consent__option--locked">
                  <ShieldCheck size={14} />
                  <div>
                    <span className="option-name">{t("necessaryName")}</span>
                    <span className="option-desc">{t("necessaryDesc")}</span>
                  </div>
                  <span className="option-always">{t("alwaysOn")}</span>
                </li>

                <li className="cookie-consent__option">
                  <label>
                    <input
                      type="checkbox"
                      checked={analytics === "granted"}
                      onChange={() => setAnalytics(toggle)}
                    />
                    <div>
                      <span className="option-name">{t("analyticsName")}</span>
                      <span className="option-desc">{t("analyticsDesc")}</span>
                    </div>
                  </label>
                </li>

                <li className="cookie-consent__option">
                  <label>
                    <input
                      type="checkbox"
                      checked={monitoring === "granted"}
                      onChange={() => setMonitoring(toggle)}
                    />
                    <div>
                      <span className="option-name">{t("monitoringName")}</span>
                      <span className="option-desc">{t("monitoringDesc")}</span>
                    </div>
                  </label>
                </li>
              </ul>
            )}

            <div className="cookie-consent__actions">
              {!showDetails && (
                <button
                  type="button"
                  className="cc-btn cc-btn--ghost"
                  onClick={() => setShowDetails(true)}
                >
                  {t("configure")}
                </button>
              )}

              {showDetails && (
                <button
                  type="button"
                  className="cc-btn cc-btn--ghost"
                  onClick={() => save({ analytics, monitoring })}
                >
                  {t("savePreferences")}
                </button>
              )}

              <button type="button" className="cc-btn cc-btn--outline" onClick={rejectAll}>
                {t("rejectAll")}
              </button>

              <button type="button" className="cc-btn cc-btn--solid" onClick={acceptAll}>
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
