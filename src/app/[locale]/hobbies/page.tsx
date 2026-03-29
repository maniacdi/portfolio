import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HobbyTabs from "@/app/components/hobbies/HobbyTabs";

import "@/styles/page.scss";

const BASE_URL = "https://magaldidev.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Hobbies — Anime, videojuegos y más" : "Hobbies — Anime, video games and more",
    description: isEs
      ? "Anime, videojuegos, dibujo y cocina. Las cosas que me gustan fuera del código."
      : "Anime, video games, drawing and cooking. The things I enjoy outside of code.",
    alternates: {
      canonical: isEs ? `${BASE_URL}/hobbies` : `${BASE_URL}/en/hobbies`,
      languages: {
        es: `${BASE_URL}/hobbies`,
        en: `${BASE_URL}/en/hobbies`,
        "x-default": `${BASE_URL}/hobbies`,
      },
    },
  };
}

export default async function HobbiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hobbies" });

  return (
    <div className="hobbies-page">
      <div className="container">
        <h1 className="page-title">{t("title")}</h1>
        <p className="page-description">{t("description")}</p>
        <HobbyTabs />
      </div>
    </div>
  );
}
