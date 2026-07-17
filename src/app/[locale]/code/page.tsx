import type { Metadata } from "next";

import Code from "@/app/components/code/Code";
import { pageMetadata } from "@/utils/seo";

import "@/styles/page.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return pageMetadata({
    locale,
    path: "/code",
    title: isEs ? "Código — Proyectos y repositorios" : "Code — Projects and repositories",
    description: isEs
      ? "Mis proyectos en GitHub: apps React, backends Node.js, herramientas personales y experimentos."
      : "My GitHub projects: React apps, Node.js backends, personal tools and experiments.",
  });
}

export default async function CodePage() {
  return <Code />;
}
