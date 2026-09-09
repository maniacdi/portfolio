export type ProjectStatus = "production" | "development" | "daily";
export type ProjectCategory = "mobile" | "web" | "game";

export interface Project {
  slug: string;
  title: string;
  descriptionKey: string;
  category: ProjectCategory;
  tags: string[];
  status?: ProjectStatus;
  demo?: string;
  repo?: string;
  featured?: boolean;
  image?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "umedicinaestetica",
    title: "Ū Medicina Estética",
    descriptionKey: "umedicinaesteticaDesc",
    category: "web",
    tags: ["Next.js", "TypeScript", "Postgres", "Drizzle", "Clerk", "Tailwind", "Vercel"],
    status: "production",
    demo: "https://umedicinaestetica.com",
    featured: true,
    image: "/images/projects/umedicinaestetica/cover.webp",
  },
  {
    slug: "uskinstore",
    title: "Ū Skin Store",
    descriptionKey: "uskinstoreDesc",
    category: "web",
    tags: ["Shopify", "Liquid", "Shopify Functions", "Next.js", "Postgres", "Python"],
    status: "production",
    demo: "https://uskinstore.com",
    image: "/images/projects/uskinstore/cover.webp",
  },
  {
    slug: "showcase",
    title: "Showcase",
    descriptionKey: "showcaseDesc",
    category: "web",
    tags: ["Next.js", "TypeScript", "SCSS", "next-intl", "Auth", "SEO"],
    status: "production",
    demo: "https://magaldi-showcase.vercel.app/",
    repo: "https://github.com/maniacdi/showcase",
    featured: true,
    image: "/images/projects/showcase/cover.webp",
  },
  {
    slug: "compras-app",
    title: "Compras App",
    descriptionKey: "comprasDesc",
    category: "mobile",
    tags: ["React Native", "Node.js", "Socket.io", "MongoDB", "Docker"],
    status: "daily",
    repo: "https://github.com/maniacdi/compras-app",
    featured: true,
    image: "/images/projects/compras-app/cover.webp",
  },
  {
    slug: "boda-web",
    title: "Web de boda",
    descriptionKey: "bodaWebDesc",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Supabase", "Postgres", "Brevo", "Vercel"],
    status: "production",
    demo: "https://elena-y-javier.vercel.app",
    image: "/images/projects/boda-web/cover.webp",
  },
  {
    slug: "ironlog",
    title: "IronLog",
    descriptionKey: "ironlogDesc",
    category: "mobile",
    tags: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    status: "production",
    repo: "https://github.com/maniacdi/ironlog",
    image: "/images/projects/ironlog/cover.webp",
  },
  {
    slug: "porra-mundial",
    title: "Porra Mundial",
    descriptionKey: "porraDesc",
    category: "game",
    tags: ["JavaScript", "Supabase", "Vercel"],
    status: "production",
    demo: "https://porra-mundial-lilac.vercel.app/",
    repo: "https://github.com/maniacdi/porra-mundial",
    image: "/images/projects/porra-mundial/cover.webp",
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    descriptionKey: "portfolioDesc",
    category: "web",
    tags: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Framer Motion"],
    status: "production",
    demo: "https://javimagaldi.com",
    repo: "https://github.com/maniacdi/portfolio",
    image: "/images/projects/portfolio/cover.webp",
  },
];
