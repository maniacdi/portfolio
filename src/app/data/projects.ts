export interface Project {
  title: string;
  descriptionKey: string;
  tags: string[];
  demo?: string;
  repo?: string;
  featured?: boolean;
  image?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "Compras App",
    descriptionKey: "comprasDesc",
    tags: ["React Native", "Node.js", "Socket.io", "MongoDB", "Docker"],
    repo: "https://github.com/maniacdi/compras-app",
    featured: true,
    image: "/images/projects/compras-app.webp",
  },
  {
    title: "Portfolio Website",
    descriptionKey: "portfolioDesc",
    tags: ["Next.js", "TypeScript", "Node.js", "SCSS", "Framer Motion"],
    demo: "https://javimagaldi.com",
    repo: "https://github.com/maniacdi/portfolio",
    image: "/images/projects/portfolio.webp",
  },
  {
    title: "Portfolio API",
    descriptionKey: "portfolioBackendDesc",
    tags: ["Node.js", "Express", "MongoDB", "REST API", "Vercel"],
    demo: "https://javimagaldi.com/travels",
    repo: "https://github.com/maniacdi/portfolio-backend",
  },
];
