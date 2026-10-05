/**
 * Service landing pages (/servicios/<slug>). The copy lives in i18n under
 * servicePages.<key>; this file only wires each service to its URL and to the
 * real projects and posts that show it done.
 *
 * Slugs are in Spanish on purpose: the site has no localized pathnames, and
 * the Spanish search terms are the ones that bring clients.
 */
export type ServiceKey = "web" | "shop" | "mobile" | "custom";

export interface ServicePage {
  key: ServiceKey;
  slug: string;
  /** Project slugs from projects.ts, most relevant first */
  projects: string[];
  /** Blog post slugs from src/content/blog */
  posts: string[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    key: "web",
    slug: "web-para-negocios",
    projects: ["umedicinaestetica", "showcase"],
    posts: ["web-a-medida-vs-wordpress", "web-rapida-mejor-seo"],
  },
  {
    key: "shop",
    slug: "reservas-y-tienda-online",
    projects: ["uskinstore", "umedicinaestetica"],
    posts: ["ocultar-el-producto-no-es-protegerlo", "showcase-plantilla-webs-comercios"],
  },
  {
    key: "mobile",
    slug: "app-movil",
    projects: ["compras-app", "ironlog"],
    posts: ["como-construi-compras-app", "ironlog-app-de-gimnasio"],
  },
  {
    key: "custom",
    slug: "software-a-medida",
    projects: ["umedicinaestetica", "boda-web"],
    posts: ["ocultar-el-producto-no-es-protegerlo", "como-uso-la-ia-en-mi-trabajo"],
  },
];

export const servicePath = (slug: string) => `/servicios/${slug}`;

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function getServiceByKey(key: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.key === key);
}
