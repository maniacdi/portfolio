import { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

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
  metadataBase: new URL("https://magaldidev.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
