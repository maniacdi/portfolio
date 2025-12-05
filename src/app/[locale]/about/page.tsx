import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";
import { AboutSection } from "@/app/components/about/AboutMeSection";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="page-container">
      <AboutSection />
    </main>
  );
}
