// Structured data for SEO using JSON-LD format

interface PersonSchemaProps {
  locale: "es" | "en";
}

export function PersonSchema({ locale }: PersonSchemaProps) {
  const isEs = locale === "es";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Javier García Magaldi",
    url: "https://javimagaldi.com",
    jobTitle: isEs ? "Desarrollador Web Full-Stack" : "Full-Stack Web Developer",
    description: isEs
      ? "Desarrollador web con 5 años de experiencia en React, TypeScript y Node.js, basado en Santander, España."
      : "Web developer with 5 years of experience in React, TypeScript and Node.js, based in Santander, Spain.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santander",
      addressCountry: "ES",
    },
    sameAs: [
      "https://github.com/maniacdi",
      "https://www.linkedin.com/in/javimagaldi",
      "https://x.com/Magaldi6",
    ],
    knowsAbout: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "Docker"],
    email: "magaldi6@gmail.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Magaldidev",
    url: "https://javimagaldi.com",
    description: "Portfolio de Javi García Magaldi, desarrollador web full-stack desde Santander.",
    author: {
      "@type": "Person",
      name: "Javier García Magaldi",
    },
    inLanguage: ["es", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
