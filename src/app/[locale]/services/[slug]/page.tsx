import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SERVICE_PAGES } from "@/app/data/services";

import ServicePageContent, { serviceMetadata } from "../../servicios/ServicePageContent";

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

// Re-render once a day so scheduled blog posts show up on their date.
export const revalidate = 86400;

// English service pages (/en/services/<slug>): same content as the Spanish
// /servicios/<slug>, with English slugs. /services/… without /en is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ locale: "en", slug: s.slug.en }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  return locale === "en" ? serviceMetadata({ locale, slug }) : {};
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  return <ServicePageContent locale={locale} slug={slug} />;
}
