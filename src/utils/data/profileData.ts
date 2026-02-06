export const profileData = {
  profile: {
    name: "Javi García Magaldi",
    job: "Full-Stack Developer",
    location: "Santander, Spain",
    email: "magaldi6@gmail.com",
    experience: "5+ years",
    bio: "Passionate about creating digital experiences that combine aesthetics with functionality. Specializing in modern web technologies and clean code architecture.",
    status: "Available for projects",
  },
  skills: {
    frontend: [
      { name: "React", level: 95, years: 5 },
      { name: "Tailwind CSS", level: 75, years: 1 },
      { name: "Framer Motion", level: 75, years: 2 },
      { name: "Redux", level: 90, years: 4 },
    ],
    backend: [
      { name: "Node.js", level: 85, years: 5 },
      { name: "MongoDB", level: 80, years: 3 },
      { name: "JAVA", level: 60, years: 1 },
    ],
    tools: [
      { name: "Git", level: 95, years: 6 },
      { name: "Docker", level: 55, years: 1 },
      { name: "Vercel", level: 90, years: 2 },
      { name: "Figma", level: 95, years: 3 },
    ],
    languages: [
      { name: "TypeScript", level: 95, years: 5 },
      { name: "JAVA", level: 60, years: 1 },
      { name: "SQL", level: 80, years: 3 },
      { name: "C#", level: 70, years: 1 },
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
