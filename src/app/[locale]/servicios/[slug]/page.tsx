import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ArrowUpRight, Check } from "lucide-react";

import ContactForm from "@/app/components/contact/ContactForm";
import { FEATURED_PROJECTS } from "@/app/data/projects";
import { getServiceBySlug, SERVICE_PAGES, servicePath } from "@/app/data/services";
import { getPost } from "@/utils/blog";
import { BASE_URL, pageMetadata } from "@/utils/seo";
import LocalizedLink from "@components/common/LocalizedLink";

import "@/styles/page.scss";
import "../servicePage.scss";

const LOCALES = ["es", "en"] as const;

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

interface Faq {
  q: string;
  a: string;
}

interface Step {
  title: string;
  text: string;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SERVICE_PAGES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: `servicePages.${service.key}` });
  return pageMetadata({
    locale,
    path: servicePath(slug),
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "servicePages" });
  const tp = await getTranslations({ locale, namespace: "featuredProjects" });
  const k = service.key;

  const includes = t.raw(`${k}.includes`) as string[];
  const faq = t.raw(`${k}.faq`) as Faq[];
  const process = t.raw("process") as Step[];

  const projects = service.projects
    .map((s) => FEATURED_PROJECTS.find((p) => p.slug === s))
    .filter((p): p is (typeof FEATURED_PROJECTS)[number] => Boolean(p));
  const posts = service.posts
    .map((s) => getPost(s, locale)?.meta)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = SERVICE_PAGES.filter((s) => s.key !== k);

  const prefix = locale === "es" ? "" : "/en";
  const pageUrl = `${BASE_URL}${prefix}${servicePath(slug)}`;

  // Structured data: what the service is, who offers it, the FAQ as rich
  // results and the breadcrumb trail.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t(`${k}.h1`),
      description: t(`${k}.metaDescription`),
      serviceType: t(`${k}.metaTitle`),
      url: pageUrl,
      areaServed: t("areaServed"),
      provider: {
        "@type": "Person",
        name: "Javi García Magaldi",
        url: BASE_URL,
        address: { "@type": "PostalAddress", addressLocality: "Santander", addressCountry: "ES" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${BASE_URL}${prefix}` },
        { "@type": "ListItem", position: 2, name: t("breadcrumbServices"), item: `${BASE_URL}${prefix}/#servicios` },
        { "@type": "ListItem", position: 3, name: t(`${k}.h1`), item: pageUrl },
      ],
    },
  ];

  return (
    <main className="page-container service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="sp-breadcrumb" aria-label="Breadcrumb">
        <LocalizedLink href="/">{t("breadcrumbHome")}</LocalizedLink>
        <span aria-hidden="true">/</span>
        <LocalizedLink href="/#servicios">{t("breadcrumbServices")}</LocalizedLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t(`${k}.h1`)}</span>
      </nav>

      <header className="sp-head">
        <h1 className="sp-title">{t(`${k}.h1`)}</h1>
        <p className="sp-lede">{t(`${k}.lede`)}</p>
        <a href="#contacto" className="sp-cta">
          {t("formTitle")}
        </a>
      </header>

      <p className="sp-intro">{t(`${k}.intro`)}</p>

      <section className="sp-block" aria-labelledby="sp-includes">
        <h2 id="sp-includes" className="sp-h2">
          {t("includesTitle")}
        </h2>
        <ul className="sp-includes">
          {includes.map((item) => (
            <li key={item}>
              <Check size={16} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sp-block" aria-labelledby="sp-process">
        <h2 id="sp-process" className="sp-h2">
          {t("processTitle")}
        </h2>
        <ol className="sp-process">
          {process.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {projects.length > 0 && (
        <section className="sp-block" aria-labelledby="sp-projects">
          <h2 id="sp-projects" className="sp-h2">
            {t("projectsTitle")}
          </h2>
          <div className="sp-projects">
            {projects.map((p) => (
              <LocalizedLink key={p.slug} href={`/projects/${p.slug}`} className="sp-project">
                {p.image && (
                  <span className="sp-project-media">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 760px) 100vw, 380px" />
                  </span>
                )}
                <span className="sp-project-body">
                  <span className="sp-project-title">{p.title}</span>
                  <span className="sp-project-desc">{tp(p.descriptionKey)}</span>
                  <span className="sp-project-go">
                    {t("seeProject")}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </LocalizedLink>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="sp-block" aria-labelledby="sp-posts">
          <h2 id="sp-posts" className="sp-h2">
            {t("postsTitle")}
          </h2>
          <ul className="sp-posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <LocalizedLink href={`/blog/${post.slug}`}>
                  <span className="sp-post-title">{post.title}</span>
                  <span className="sp-post-excerpt">{post.excerpt}</span>
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="sp-block" aria-labelledby="sp-faq">
        <h2 id="sp-faq" className="sp-h2">
          {t("faqTitle")}
        </h2>
        <div className="sp-faq">
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ContactForm defaultService={k} title={t("formTitle")} subtitle={t("formSubtitle")} />

      <nav className="sp-others" aria-labelledby="sp-others">
        <h2 id="sp-others" className="sp-h2">
          {t("otherServices")}
        </h2>
        <ul>
          {others.map((s) => (
            <li key={s.key}>
              <LocalizedLink href={servicePath(s.slug)}>
                {t(`${s.key}.h1`)}
                <ArrowUpRight size={15} aria-hidden="true" />
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
