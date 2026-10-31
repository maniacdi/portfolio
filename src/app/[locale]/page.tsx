import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ContactForm from "../components/contact/ContactForm";
import ClientWork from "../components/home/ClientWork";
import FeaturedProjects from "../components/home/FeaturedProjects";
import HeroBillboard from "../components/home/hero/HeroBillboard";
import NowStrip from "../components/home/NowStrip";
import PowerHero from "../components/home/PowerHero";
import Services from "../components/home/Services";

import "@/styles/page.scss";

const BASE_URL = "https://javimagaldi.com";

// Which hero the home shows, set from Vercel without touching code (env
// changes apply on the next deployment):
//   HERO_VARIANT = "billboard" (default) | "classic" (the previous PowerHero,
//                  kept in the code in case we go back to it)
const HERO_VARIANT = process.env.HERO_VARIANT === "classic" ? "classic" : "billboard";

// Re-render once a day so scheduled blog posts show up on their date.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const isEs = locale === "es";
  const canonical = isEs ? BASE_URL : `${BASE_URL}/en`;

  return {
    // Already carries the brand: no "| Javi Magaldi" template on top.
    title: { absolute: t("title") },
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        es: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="home-container">
      {HERO_VARIANT === "classic" ? <PowerHero /> : <HeroBillboard />}
      <ClientWork />
      <Services />
      <FeaturedProjects />
      <NowStrip locale={locale} />
      <ContactForm />
    </main>
  );
}
