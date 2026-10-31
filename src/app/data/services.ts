/**
 * Service landing pages: /servicios/<slug> in Spanish, /en/services/<slug> in
 * English. The copy lives in i18n under servicePages.<key>; this file only
 * wires each service to its URLs and to the real projects and posts that show
 * it done.
 *
 * Only the service pages have localized slugs: they are the pages meant to be
 * found by people searching in each language. The rest of the site keeps the
 * same path in both languages.
 */
export type ServiceKey = "web" | "booking" | "shop" | "mobile" | "custom";

export interface ServicePage {
  key: ServiceKey;
  slug: { es: string; en: string };
  /** Project slugs from projects.ts, most relevant first */
  projects: string[];
  /** Blog post slugs from src/content/blog */
  posts: string[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    key: "web",
    slug: { es: "web-para-negocios", en: "business-websites" },
    projects: ["umedicinaestetica", "showcase"],
    posts: [
      "como-crear-pagina-web-negocio",
      "seo-local-negocios",
      "web-a-medida-vs-wordpress",
      "web-rapida-mejor-seo",
    ],
  },
  {
    key: "booking",
    slug: { es: "desarrollo-sistemas-reservas-online", en: "online-booking-system" },
    projects: ["umedicinaestetica", "showcase"],
    posts: ["showcase-plantilla-webs-comercios", "ocultar-el-producto-no-es-protegerlo"],
  },
  {
    key: "shop",
    slug: { es: "desarrollo-tiendas-online", en: "online-store-development" },
    projects: ["uskinstore", "showcase"],
    posts: ["ocultar-el-producto-no-es-protegerlo", "showcase-plantilla-webs-comercios"],
  },
  {
    key: "mobile",
    slug: { es: "app-movil", en: "mobile-app-development" },
    projects: ["compras-app", "ironlog"],
    posts: ["como-construi-compras-app", "ironlog-app-de-gimnasio"],
  },
  {
    key: "custom",
    slug: { es: "software-a-medida", en: "custom-software" },
    projects: ["umedicinaestetica", "boda-web"],
    posts: ["ocultar-el-producto-no-es-protegerlo", "como-uso-la-ia-en-mi-trabajo"],
  },
];

/** Section folder per language: /servicios/… and /en/services/… */
export const SERVICE_SECTION = { es: "servicios", en: "services" } as const;

const lang = (locale: string) => (locale === "en" ? "en" : "es");

/** Path without the locale prefix (LocalizedLink adds /en). */
export function servicePath(service: ServicePage, locale: string): string {
  const l = lang(locale);
  return `/${SERVICE_SECTION[l]}/${service.slug[l]}`;
}

export function getServiceBySlug(slug: string, locale: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug[lang(locale)] === slug);
}

export function getServiceByKey(key: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.key === key);
}

/**
 * Same service in the other language, for the language switcher: the slugs
 * differ, so swapping the prefix alone would land on a 404.
 * Returns undefined when the path is not a service page.
 */
export function translateServicePath(
  pathname: string,
  from: string,
  to: string
): string | undefined {
  const match = pathname.match(/^\/(?:servicios|services)\/([^/]+)\/?$/);
  if (!match) return undefined;
  const service = getServiceBySlug(match[1], from);
  return service && servicePath(service, to);
}

/**
 * 301s for URLs that changed: the old combined booking + shop page, and the
 * English pages that used to live under the Spanish slugs.
 */
export function serviceRedirects() {
  const booking = getServiceByKey("booking")!;
  const moved = [
    { source: "/servicios/reservas-y-tienda-online", destination: servicePath(booking, "es") },
    {
      source: "/en/servicios/reservas-y-tienda-online",
      destination: `/en${servicePath(booking, "en")}`,
    },
    ...SERVICE_PAGES.filter((s) => s.key !== "booking" && s.key !== "shop").map((s) => ({
      source: `/en/servicios/${s.slug.es}`,
      destination: `/en${servicePath(s, "en")}`,
    })),
  ];
  return moved.map((r) => ({ ...r, permanent: true }));
}
