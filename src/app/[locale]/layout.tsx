import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import WeatherWidget from "@components/common/WeatherWidget";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";

import ChatBot from "../components/chatBot/ChatBot";
import EasterEggs from "../components/common/EasterEggs";
import TerminalLoader from "../components/common/TerminalLoader";
import { ToastProvider } from "../components/toast/ToastProvider";

import "../../styles/globals.scss";

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
    );
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return notFound();
  }
}
