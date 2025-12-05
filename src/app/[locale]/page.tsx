import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";
import Hero from "@/app/components/home/Hero";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="home-container">
      <Hero />
      <section className="hero">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </section>
    </main>
  );
}
