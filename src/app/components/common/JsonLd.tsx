// Structured data for SEO using JSON-LD format

const BASE_URL = "https://javimagaldi.com";

// Stable ids so the schemas point at each other (and service pages can name
// the business as provider) instead of repeating the same entity.
export const PERSON_ID = `${BASE_URL}/#person`;
export const BUSINESS_ID = `${BASE_URL}/#business`;
const WEBSITE_ID = `${BASE_URL}/#website`;

interface SchemaProps {
  locale: "es" | "en";
}

function Schema({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function PersonSchema({ locale }: SchemaProps) {
  const isEs = locale === "es";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Javier García Magaldi",
    alternateName: ["Javi Magaldi", "Javi García Magaldi"],
    url: BASE_URL,
    jobTitle: isEs ? "Desarrollador Web Full-Stack" : "Full-Stack Web Developer",
    description: isEs
      ? "Desarrollador web full-stack en Santander. Construyo aplicaciones web y móviles, APIs e infraestructura con React, React Native, Node.js y Java (Spring Boot)."
      : "Full-stack web developer in Santander, Spain. I build web and mobile apps, APIs and infrastructure with React, React Native, Node.js and Java (Spring Boot).",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santander",
      addressRegion: "Cantabria",
      addressCountry: "ES",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad de Cantabria",
    },
    sameAs: [
      "https://github.com/maniacdi",
      "https://www.linkedin.com/in/javimagaldi",
      "https://x.com/Magaldi6",
    ],
    knowsAbout: [
      "React",
      "React Native",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express",
      "Java",
      "Spring Boot",
      "REST APIs",
      "MongoDB",
      "Docker",
      "CI/CD",
    ],
    email: "magaldi6@gmail.com",
  };

  return <Schema data={schema} />;
}

/**
 * The freelance business behind the service pages, for local search. A
 * service-area business: it works in Santander and remotely, with no premises
 * open to the public, so there is no street address, only the area served.
 */
export function BusinessSchema({ locale }: SchemaProps) {
  const isEs = locale === "es";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Javi Magaldi",
    url: isEs ? BASE_URL : `${BASE_URL}/en`,
    image: `${BASE_URL}/images/og-card.jpg`,
    description: isEs
      ? "Desarrollo web, apps móviles, sistemas de reservas, tiendas online y software a medida para negocios. Desarrollador full-stack en Santander."
      : "Websites, mobile apps, booking systems, online stores and custom software for businesses. Full-stack developer in Santander, Spain.",
    founder: { "@id": PERSON_ID },
    email: "magaldi6@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santander",
      addressRegion: "Cantabria",
      addressCountry: "ES",
    },
    areaServed: [
      { "@type": "City", name: "Santander" },
      { "@type": "AdministrativeArea", name: "Cantabria" },
      { "@type": "Country", name: isEs ? "España" : "Spain" },
    ],
    knowsLanguage: ["es", "en"],
  };

  return <Schema data={schema} />;
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Javi Magaldi",
    alternateName: "Magaldidev",
    url: BASE_URL,
    description:
      "Portfolio de Javier García Magaldi, desarrollador web full-stack desde Santander.",
    author: { "@id": PERSON_ID },
    inLanguage: ["es", "en"],
  };

  return <Schema data={schema} />;
}
