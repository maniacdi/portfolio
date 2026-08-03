import type { Metadata } from "next";

import { legalNotice, type Locale } from "@/app/data/legalContent";
import { pageMetadata } from "@/utils/seo";
import LegalDocument from "@components/legal/LegalDocument";
import LegalNav from "@components/legal/LegalNav";

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
    path: "/legal",
    title: isEs ? "Aviso legal" : "Legal notice",
    description: isEs
      ? "Datos identificativos del titular de javimagaldi.com, condiciones de uso y propiedad intelectual."
      : "Identifying details of the owner of javimagaldi.com, terms of use and intellectual property.",
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = legalNotice[locale as Locale] ?? legalNotice.es;

  return (
    <main className="legal-page page-container">
      <LegalDocument doc={doc} locale={(locale as Locale) ?? "es"} />
      <LegalNav current="notice" />
    </main>
  );
}
