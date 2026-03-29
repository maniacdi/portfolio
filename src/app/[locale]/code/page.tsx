import type { Metadata } from "next";

import Code from "@/app/components/code/Code";

import "@/styles/page.scss";

const BASE_URL = "https://magaldidev.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Código — Proyectos y repositorios" : "Code — Projects and repositories",
    description: isEs
      ? "Mis proyectos en GitHub: apps React, backends Node.js, herramientas personales y experimentos."
      : "My GitHub projects: React apps, Node.js backends, personal tools and experiments.",
    alternates: {
      canonical: isEs ? `${BASE_URL}/code` : `${BASE_URL}/en/code`,
      languages: {
        es: `${BASE_URL}/code`,
        en: `${BASE_URL}/en/code`,
        "x-default": `${BASE_URL}/code`,
      },
    },
  };
}

export default async function CodePage() {
  return <Code />;
}
