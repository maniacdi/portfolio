export type ProjectStatus = "production" | "development" | "daily";
export type ProjectCategory = "mobile" | "web" | "game";

export interface Project {
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
    title: "IronLog",
    descriptionKey: "ironlogDesc",
    category: "mobile",
    tags: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    status: "production",
    repo: "https://github.com/maniacdi/ironlog",
    image: "/images/projects/ironlog/cover.webp",
  },
  {
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
