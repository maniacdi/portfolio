import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";

import ChatBot from "../components/chatBot/ChatBot";
import EasterEggs from "../components/common/EasterEggs";
import ScrollToTop from "../components/common/ScrollToTop";
import { PersonSchema, WebsiteSchema } from "../components/common/JsonLd";
import TerminalLoader from "../components/common/TerminalLoader";
import ThemeProvider from "../components/common/ThemeProvider";
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
  const baseUrl = "https://javimagaldi.com";


  return {
    title: {
      default: t("title"),
      template: `%s | Magaldidev`,
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: locale === "es" ? baseUrl : `${baseUrl}/en`,
      languages: {
        "es": baseUrl,
        "en": `${baseUrl}/en`,
        "x-default": baseUrl,
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
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Magaldidev Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: "@magaldidev",
      creator: "@magaldidev",
      images: [`${BASE_URL}/images/og-image.jpg`],
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
        <ThemeProvider />
        <WebsiteSchema />
        <PersonSchema locale={locale as "es" | "en"} />
        <Analytics />
        <SpeedInsights />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <ScrollToTop />
            <TerminalLoader />
            <Header />
            <main className="main-content">{children}</main>
            <ChatBot />
            <Footer />
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
