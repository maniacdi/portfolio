import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HobbyTabs from "@/app/components/hobbies/HobbyTabs";
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
    path: "/hobbies",
    title: isEs ? "Hobbies — Anime, videojuegos y más" : "Hobbies — Anime, video games and more",
    description: isEs
      ? "Anime, videojuegos, dibujo y cocina. Las cosas que me gustan fuera del código."
      : "Anime, video games, drawing and cooking. The things I enjoy outside of code.",
  });
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
