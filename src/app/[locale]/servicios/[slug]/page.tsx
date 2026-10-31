import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SERVICE_PAGES } from "@/app/data/services";

import ServicePageContent, { serviceMetadata } from "../ServicePageContent";

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

// Re-render once a day so scheduled blog posts show up on their date.
export const revalidate = 86400;

// Spanish only: the English pages live at /en/services/<slug>, and the old
// /en/servicios/<slug> URLs 301 there (next.config.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ locale: "es", slug: s.slug.es }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  return locale === "es" ? serviceMetadata({ locale, slug }) : {};
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params;
  if (locale !== "es") notFound();
  return <ServicePageContent locale={locale} slug={slug} />;
}
