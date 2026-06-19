export const profileData = {
  profile: {
    name: "Javi García Magaldi",
    job: "Full-Stack Developer",
    location: "Santander, Spain",
    email: "magaldi6@gmail.com",
    experience: "6+ years",
    bio: "Full-stack developer: React and TypeScript on the front, Java (Spring Boot) and Node.js on the back. Microservices with hexagonal architecture serving 10,000+ daily users.",
    status: "Available for projects",
  },
  skills: {
    frontend: [
      { name: "React", years: 5 },
      { name: "Next.js", years: 3 },
      { name: "React Native", years: 2 },
      { name: "Vue", years: 2 },
      { name: "Redux / Zustand", years: 4 },
      { name: "Framer Motion", years: 2 },
    ],
    backend: [
      { name: "Java · Spring Boot", years: 3 },
      { name: "Node.js", years: 4 },
      { name: "Express", years: 4 },
      { name: "MongoDB", years: 3 },
      { name: "Redis", years: 2 },
      { name: "Socket.io", years: 2 },
    ],
    tools: [
      { name: "Git", years: 6 },
      { name: "Docker", years: 2 },
      { name: "GitHub Actions", years: 2 },
      { name: "Jest", years: 4 },
      { name: "Cypress", years: 3 },
      { name: "Figma", years: 3 },
    ],
    languages: [
      { name: "TypeScript", years: 5 },
      { name: "JavaScript", years: 6 },
      { name: "Java", years: 3 },
      { name: "SQL", years: 3 },
    ],
  },
  contact: {
    email: "magaldi6@gmail.com",
    github: "github.com/maniacdi",
    linkedin: "linkedin.com/in/javimagaldi",
  },
} as const;

export type ProfileData = typeof profileData;
export type SkillCategory = keyof typeof profileData.skills;
export type Skill = (typeof profileData.skills.frontend)[number];
