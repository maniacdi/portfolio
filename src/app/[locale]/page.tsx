import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";
import PowerHero from "../components/home/PowerHero";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="home-container">
      <PowerHero />
    </main>
  );
}
