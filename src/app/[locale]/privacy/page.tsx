import type { Metadata } from "next";

import { type Locale, privacyPolicy } from "@/app/data/legalContent";
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
    path: "/privacy",
    title: isEs ? "Política de privacidad" : "Privacy policy",
    description: isEs
      ? "Qué datos personales trata javimagaldi.com, con qué finalidad y base jurídica, y cómo ejercer tus derechos."
      : "What personal data javimagaldi.com processes, for what purpose and legal basis, and how to exercise your rights.",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = privacyPolicy[locale as Locale] ?? privacyPolicy.es;

  return (
    <main className="legal-page page-container">
      <LegalDocument doc={doc} locale={(locale as Locale) ?? "es"} />
      <LegalNav current="privacy" />
    </main>
  );
}
