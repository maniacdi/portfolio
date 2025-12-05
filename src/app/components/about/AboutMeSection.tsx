"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  // Translation hook
  const t = useTranslations("about");

  return (
    <section className={className} aria-labelledby="about-title" role="region">
      {/* Title */}
      <h2 id="about-title" className="text-3xl font-bold mb-2">
        {t("title")}
      </h2>

      {/* Subtitle */}
      <p className="text-lg opacity-80 mb-4">{t("subtitle")}</p>

      {/* Description */}
      <p className="text-base leading-relaxed mb-8">{t("description")}</p>

      {/* Skills Block */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Frontend */}
        <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-900/40 shadow-lg">
          <h3 className="text-xl font-semibold mb-1">{t("skills.frontend")}</h3>
          <p className="text-sm opacity-70">
            {/* Short explanation — you can change or translate in JSON */}
            Creating modern, responsive, and interactive interfaces.
          </p>
        </div>

        {/* Backend */}
        <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-900/40 shadow-lg">
          <h3 className="text-xl font-semibold mb-1">{t("skills.backend")}</h3>
          <p className="text-sm opacity-70">Building secure and scalable server-side logic.</p>
        </div>

        {/* Fullstack */}
        <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-900/40 shadow-lg">
          <h3 className="text-xl font-semibold mb-1">{t("skills.fullstack")}</h3>
          <p className="text-sm opacity-70">Delivering complete end-to-end solutions.</p>
        </div>
      </div>
    </section>
  );
};
