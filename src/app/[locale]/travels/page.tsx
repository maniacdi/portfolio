import { getTranslations } from "next-intl/server";
import "@/styles/page.scss";
import TravelsContent from "@/app/components/travels/TravelContent";

export default async function TravelsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "travels" });

  return (
    <main className="travels page-container">
      <TravelsContent />
    </main>
  );
}