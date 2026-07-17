import type { Metadata } from "next";

import TravelsContent from "@/app/components/travels/TravelContent";
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
    path: "/travels",
    title: isEs ? "Viajes — Mis destinos favoritos" : "Travels — My favourite destinations",
    description: isEs
      ? "Mis viajes y experiencias alrededor del mundo. Destinos, fotos y recuerdos."
      : "My trips and experiences around the world. Destinations, photos and memories.",
  });
}

export default async function TravelsPage() {
  return (
    <main className="travels page-container">
      <TravelsContent />
    </main>
  );
}
