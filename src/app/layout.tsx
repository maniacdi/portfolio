import { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Magaldidev — Portfolio",
    template: "%s | Magaldidev",
  },
  description: "Portfolio de Javi García Magaldi, desarrollador web full-stack desde Santander.",
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
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
