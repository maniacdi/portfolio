"use client";

import { useLocale, useTranslations } from "next-intl";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Briefcase, CalendarCheck, Globe, ShoppingBag, Smartphone, Wrench } from "lucide-react";

import { getProjectBySlug, SERVICE_PROOF } from "@/app/data/projects";
import { getServiceByKey, servicePath } from "@/app/data/services";
import { useContactModalStore } from "@/app/store/useContactModalStore";
import LocalizedLink from "@components/common/LocalizedLink";
import Reveal from "@components/common/Reveal";

import "./Services.scss";

const SERVICES: { key: keyof typeof SERVICE_PROOF; Icon: LucideIcon }[] = [
  { key: "web", Icon: Globe },
  { key: "booking", Icon: CalendarCheck },
  { key: "shop", Icon: ShoppingBag },
  { key: "mobile", Icon: Smartphone },
  { key: "custom", Icon: Wrench },
];

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { open } = useContactModalStore();
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicios" className="services-section">
      <Reveal>
        <h2 className="section-title">{t("title")}</h2>
      </Reveal>

      <Reveal>
        <p className="section-subtitle">{t("subtitle")}</p>
      </Reveal>

      <div className="services-grid">
        {SERVICES.map(({ key, Icon }) => {
          const proof = getProjectBySlug(SERVICE_PROOF[key])!;
          return (
            <Reveal key={key}>
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
                    href={servicePath(getServiceByKey(key)!, locale)}
                    className="stretched-link"
                  >
                    {t(`items.${key}.title`)}
                  </LocalizedLink>
                </h3>
                <p className="service-desc">{t(`items.${key}.desc`)}</p>
                <span className="service-cta" aria-hidden="true">
                  {t("moreLabel")}
                </span>
                <LocalizedLink href={`/projects/${proof.slug}`} className="service-proof">
                  {t("proofLabel", { project: proof.title })}
                </LocalizedLink>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="hire-reveal">
        <motion.button
          type="button"
          className="hire-card"
          onClick={() => open("employee")}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          aria-label={`${t("hire.title")} — ${t("hire.cta")}`}
        >
          <span className="hire-icon">
            <Briefcase size={22} />
          </span>
          <div className="hire-text">
            <h3 className="hire-title">{t("hire.title")}</h3>
            <p className="hire-desc">{t("hire.desc")}</p>
          </div>
          <span className="hire-cta">{t("hire.cta")}</span>
        </motion.button>
      </Reveal>
    </section>
  );
}
