import { getTranslations } from "next-intl/server";
import HobbyTabs from "@/app/components/hobbies/HobbyTabs";

export default async function HobbiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hobbies" });

  return (
    <div className="hobbies-page min-h-screen bg-gradient-to-b from-background to-background-dark py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center my-12 mx-auto max-w-3xl">
          <div className="page-header-animation">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon to-neon-secondary">
              {t("title")}
            </h1>
          </div>
          <div className="page-subtitle-animation">
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{t("description")}</p>
          </div>
        </div>

        <HobbyTabs />
      </div>
    </div>
  );
}
