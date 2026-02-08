import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import WeatherWidget from "@components/common/WeatherWidget";
import "../../styles/globals.scss";
import TerminalLoader from "../components/common/TerminalLoader";
import EasterEggs from "../components/common/EasterEggs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  try {
    const messages = await getMessages({ locale });

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <TerminalLoader />
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
        <WeatherWidget />
        <EasterEggs />
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return notFound();
  }
}
