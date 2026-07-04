"use client";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Briefcase, Globe, ShoppingBag, Smartphone, Wrench } from "lucide-react";

import { useContactModalStore } from "@/app/store/useContactModalStore";
import Reveal from "@components/common/Reveal";

import "./Services.scss";

const SERVICES: { key: string; Icon: LucideIcon }[] = [
  { key: "web", Icon: Globe },
  { key: "shop", Icon: ShoppingBag },
  { key: "mobile", Icon: Smartphone },
  { key: "custom", Icon: Wrench },
];

export default function Services() {
  const t = useTranslations("services");
  const { open } = useContactModalStore();

  return (
    <section id="servicios" className="services-section">
      <Reveal className="section-label">
        <Wrench size={14} />
        <span>{t("label")}</span>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="section-title">{t("title")}</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="section-subtitle">{t("subtitle")}</p>
      </Reveal>

      <div className="services-grid">
        {SERVICES.map(({ key, Icon }, index) => (
          <Reveal key={key} delay={0.12 + index * 0.06}>
            <motion.button
              type="button"
              className="service-card"
              onClick={() => open(key)}
              whileHover={{ y: -4 }}
              aria-label={`${t(`items.${key}.title`)} — ${t("ctaLabel")}`}
            >
              <span className="service-icon">
                <Icon size={22} />
              </span>
              <h3 className="service-name">{t(`items.${key}.title`)}</h3>
              <p className="service-desc">{t(`items.${key}.desc`)}</p>
              <span className="service-cta">
                {t("ctaLabel")}
                <ArrowRight size={15} />
              </span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="hire-reveal">
        <motion.button
          type="button"
          className="hire-card"
          onClick={() => open("employee")}
          whileHover={{ y: -3 }}
          aria-label={`${t("hire.title")} — ${t("hire.cta")}`}
        >
          <span className="hire-icon">
            <Briefcase size={22} />
          </span>
          <div className="hire-text">
            <h3 className="hire-title">{t("hire.title")}</h3>
            <p className="hire-desc">{t("hire.desc")}</p>
          </div>
          <span className="hire-cta">
            {t("hire.cta")}
            <ArrowRight size={16} />
          </span>
        </motion.button>
      </Reveal>
    </section>
  );
}
