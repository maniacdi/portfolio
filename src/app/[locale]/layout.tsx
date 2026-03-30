import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import WeatherWidget from "@components/common/WeatherWidget";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import { Analytics } from "@vercel/analytics/react";

import ChatBot from "../components/chatBot/ChatBot";
import EasterEggs from "../components/common/EasterEggs";
import TerminalLoader from "../components/common/TerminalLoader";
import { PersonSchema, WebsiteSchema } from "../components/common/JsonLd";
import { ToastProvider } from "../components/toast/ToastProvider";

import "../../styles/globals.scss";

const BASE_URL = "https://javimagaldi.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const isEs = locale === "es";
  const canonical = isEs ? BASE_URL : `${BASE_URL}/en`;

  return {
    title: {
      default: t("title"),
      template: `%s | Magaldidev`,
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: {
        es: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: "Magaldidev",
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_ES",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
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
      <>
        <WebsiteSchema />
        <PersonSchema locale={locale as "es" | "en"} />
        <Analytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <TerminalLoader />
            <Header />
            <main className="main-content">{children}</main>
            <ChatBot />
            <Footer />
            <WeatherWidget />
            <EasterEggs />
          </ToastProvider>
        </NextIntlClientProvider>
      </>
    );
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return notFound();
  }
}
