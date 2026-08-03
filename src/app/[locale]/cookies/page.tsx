import type { Metadata } from "next";

import { cookiePolicy, type Locale } from "@/app/data/legalContent";
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
    path: "/cookies",
    title: isEs ? "Política de cookies" : "Cookie policy",
    description: isEs
      ? "Cookies y almacenamiento local que usa javimagaldi.com, para qué sirven y cómo revocar tu consentimiento."
      : "Cookies and local storage used by javimagaldi.com, what they are for, and how to withdraw your consent.",
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = cookiePolicy[locale as Locale] ?? cookiePolicy.es;

  return (
    <main className="legal-page page-container">
      <LegalDocument doc={doc} locale={(locale as Locale) ?? "es"} />
      <LegalNav current="cookies" />
    </main>
  );
}
