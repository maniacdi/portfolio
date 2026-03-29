import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PowerHero from "../components/home/PowerHero";

import "@/styles/page.scss";

const BASE_URL = "https://magaldidev.vercel.app";

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
    title: isEs
      ? "Javi García Magaldi — Desarrollador Web Full-Stack"
      : "Javi García Magaldi — Full-Stack Web Developer",
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

export default async function Home() {
  return (
    <main className="home-container">
      <PowerHero />
    </main>
  );
}
