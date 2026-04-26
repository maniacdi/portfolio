import { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
}); 

export const metadata: Metadata = {
  title: {
    default: "Magaldidev — Portfolio",
    template: "%s | Magaldidev",
  },
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
      <body className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}
