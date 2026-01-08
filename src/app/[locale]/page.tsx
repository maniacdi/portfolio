import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";
import ImpactHero from "../components/home/ImpactHero";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="home-container">
      <ImpactHero />
    </main>
  );
}
