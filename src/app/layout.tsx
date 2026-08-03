import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono,Orbitron, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";

import "../styles/globals.scss";
import ConsentedTracking from "./components/common/ConsentedTracking";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magaldidev — Portfolio",
  description: "Portfolio of Javi García Magaldi, full-stack web developer from Santander.",
  metadataBase: new URL("https://javimagaldi.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale || "es"}>
      <body className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetBrainsMono.variable}`}>
        <ConsentedTracking gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {children}
      </body>
    </html>
  );
}
