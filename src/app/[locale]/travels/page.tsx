import type { Metadata } from "next";

import TravelsContent from "@/app/components/travels/TravelContent";

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
    title: isEs ? "Viajes — Mis destinos favoritos" : "Travels — My favourite destinations",
    description: isEs
      ? "Mis viajes y experiencias alrededor del mundo. Destinos, fotos y recuerdos."
      : "My trips and experiences around the world. Destinations, photos and memories.",
    alternates: {
      canonical: isEs ? `${BASE_URL}/travels` : `${BASE_URL}/en/travels`,
      languages: {
        es: `${BASE_URL}/travels`,
        en: `${BASE_URL}/en/travels`,
        "x-default": `${BASE_URL}/travels`,
      },
    },
  };
}

export default async function TravelsPage() {
  return (
    <main className="travels page-container">
      <TravelsContent />
    </main>
  );
}
