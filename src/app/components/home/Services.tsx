"use client";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Briefcase, Globe, ShoppingBag, Smartphone, Wrench } from "lucide-react";

import { getProjectBySlug, SERVICE_PROOF } from "@/app/data/projects";
import { getServiceByKey, servicePath } from "@/app/data/services";
import { useContactModalStore } from "@/app/store/useContactModalStore";
import LocalizedLink from "@components/common/LocalizedLink";
import Reveal from "@components/common/Reveal";

import "./Services.scss";

const SERVICES: { key: keyof typeof SERVICE_PROOF; Icon: LucideIcon }[] = [
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
        {SERVICES.map(({ key, Icon }, index) => {
          const proof = getProjectBySlug(SERVICE_PROOF[key])!;
          return (
            <Reveal key={key} delay={0.12 + index * 0.06}>
              {/* Real links to each service page: crawlable, and the page has
                  the detail plus the form with the service preselected. The
                  title link is stretched over the card; the proof link sits
                  above it with its own click. */}
              <article className="service-card">
                <span className="service-icon">
                  <Icon size={22} />
                </span>
                <h3 className="service-name">
                  <LocalizedLink
                    href={servicePath(getServiceByKey(key)!.slug)}
                    className="stretched-link"
                  >
                    {t(`items.${key}.title`)}
                  </LocalizedLink>
                </h3>
                <p className="service-desc">{t(`items.${key}.desc`)}</p>
                <span className="service-cta" aria-hidden="true">
                  {t("moreLabel")}
                  <ArrowRight size={15} />
                </span>
                <LocalizedLink href={`/projects/${proof.slug}`} className="service-proof">
                  {t("proofLabel")}: {proof.title} →
                </LocalizedLink>
              </article>
            </Reveal>
          );
        })}
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
