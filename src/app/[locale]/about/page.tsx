import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AboutSection } from "@/app/components/about/AboutMeSection/AboutMeSection";
import { pageMetadata } from "@/utils/seo";

import "@/styles/page.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return pageMetadata({
    locale,
    path: "/about",
    title: isEs ? "Sobre mí — Javi García Magaldi" : "About me — Javi García Magaldi",
    description: isEs
      ? "Desarrollador web full-stack desde Santander. 6 años de experiencia con React, TypeScript y Node.js."
      : "Full-stack web developer from Santander. 6 years of experience with React, TypeScript and Node.js.",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="page-container">
      <h1 className="page-title gradient-text">{t("title")}</h1>
      <p className="page-description">{t("subtitle")}</p>

      <AboutSection className="about-page" />
    </main>
  );
}
