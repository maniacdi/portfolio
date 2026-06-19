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
      ? "Desarrollador web full-stack en Santander. Construyo aplicaciones web y móviles, APIs e infraestructura con React, React Native, Node.js y Java (Spring Boot)."
      : "Full-stack web developer in Santander, Spain. I build web and mobile apps, APIs and infrastructure with React, React Native, Node.js and Java (Spring Boot).",
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
