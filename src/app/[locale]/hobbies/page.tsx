import { getTranslations } from "next-intl/server";
import HobbyTabs from "@/app/components/hobbies/HobbyTabs";
import "@/styles/page.scss";

export default async function HobbiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hobbies" });

  return (
    <div className="hobbies-page">
      <div className="container">
        <h1 className="page-title">{t("title")}</h1>
        <p className="page-description">{t("description")}</p>

        <HobbyTabs />
      </div>
    </div>
  );
}
