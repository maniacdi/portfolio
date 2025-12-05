import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <main className="page-container">
      <h1>{t("title")}</h1>
    </main>
  );
}
