"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiFramer,
  SiVite,
  SiWebpack,
  SiRedux,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiJest,
  SiCypress,
  SiHtml5,
  SiCss,
  SiNpm,
  SiPnpm,
  SiEslint,
  SiPrettier,
  SiFigma,
  SiPostman,
  SiJira,
  SiConfluence,
  SiSlack,
  SiNotion,
  SiNetlify,
  SiLinux,
  SiUbuntu,
  SiMarkdown,
  SiBitbucket,
  SiExpo,
  SiSocketdotio,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import { FaAws, FaJava } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { RiReactjsLine } from "react-icons/ri";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";

import "./TechCarousel.scss";

interface TechItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  category: "frontend" | "backend" | "tools" | "database";
}

export default function TechCarousel() {
  const t = useTranslations("techCarousel");
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const techStack: TechItem[] = [
    // ============================================
    // FRONTEND FRAMEWORKS & LIBRARIES
    // ============================================
    {
      id: "react",
      name: "React",
      icon: <SiReact />,
      color: "#61DAFB",
      category: "frontend",
    },
    {
      id: "react-native",
      name: "React Native",
      icon: <RiReactjsLine />,
      color: "#61DAFB",
      category: "frontend",
    },
    {
      id: "vue",
      name: "Vue.js",
      icon: <SiVuedotjs />,
      color: "#4FC08D",
      category: "frontend",
    },
    {
      id: "nextjs",
      name: "Next.js",
      icon: <SiNextdotjs />,
      color: "#ffffff",
      category: "frontend",
    },

    // ============================================
    // LANGUAGES
    // ============================================
    {
      id: "typescript",
      name: "TypeScript",
      icon: <SiTypescript />,
      color: "#3178C6",
      category: "frontend",
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: <SiJavascript />,
      color: "#F7DF1E",
      category: "frontend",
    },
    {
      id: "java",
      name: "Java",
      icon: <FaJava />,
      color: "#007396",
      category: "backend",
    },

    // ============================================
    // STYLING
    // ============================================
    {
      id: "html",
      name: "HTML5",
      icon: <SiHtml5 />,
      color: "#E34F26",
      category: "frontend",
    },
    {
      id: "css",
      name: "CSS3",
      icon: <SiCss />,
      color: "#1572B6",
      category: "frontend",
    },
    {
      id: "sass",
      name: "Sass",
      icon: <SiSass />,
      color: "#CC6699",
      category: "frontend",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      color: "#06B6D4",
      category: "frontend",
    },

    // ============================================
    // ANIMATION & 3D
    // ============================================
    {
      id: "framer",
      name: "Framer Motion",
      icon: <SiFramer />,
      color: "#FF4EDD",
      category: "frontend",
    },
    {
      id: "threejs",
      name: "Three.js",
      icon: <TbBrandThreejs />,
      color: "#a0a0a0",
      category: "frontend",
    },

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    {
      id: "redux",
      name: "Redux",
      icon: <SiRedux />,
      color: "#764ABC",
      category: "frontend",
    },
    {
      id: "zustand",
      name: "Zustand",
      icon: <RiReactjsLine />,
      color: "#443E38",
      category: "frontend",
    },

    // ============================================
    // BUILD TOOLS
    // ============================================
    {
      id: "vite",
      name: "Vite",
      icon: <SiVite />,
      color: "#646CFF",
      category: "tools",
    },
    {
      id: "webpack",
      name: "Webpack",
      icon: <SiWebpack />,
      color: "#8DD6F9",
      category: "tools",
    },
    {
      id: "expo",
      name: "Expo",
      icon: <SiExpo />,
      color: "#000020",
      category: "tools",
    },

    // ============================================
    // BACKEND
    // ============================================
    {
      id: "nodejs",
      name: "Node.js",
      icon: <SiNodedotjs />,
      color: "#339933",
      category: "backend",
    },
    {
      id: "express",
      name: "Express",
      icon: <SiExpress />,
      color: "#a0a0a0",
      category: "backend",
    },
    {
      id: "socketio",
      name: "Socket.io",
      icon: <SiSocketdotio />,
      color: "#010101",
      category: "backend",
    },
    {
      id: "graphql",
      name: "GraphQL",
      icon: <SiGraphql />,
      color: "#E10098",
      category: "backend",
    },

    // ============================================
    // DATABASES
    // ============================================
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <SiMongodb />,
      color: "#47A248",
      category: "database",
    },
    {
      id: "mysql",
      name: "MySQL",
      icon: <SiMysql />,
      color: "#4479A1",
      category: "database",
    },

    // ============================================
    // TESTING
    // ============================================
    {
      id: "jest",
      name: "Jest",
      icon: <SiJest />,
      color: "#C21325",
      category: "tools",
    },
    {
      id: "cypress",
      name: "Cypress",
      icon: <SiCypress />,
      color: "#17202C",
      category: "tools",
    },

    // ============================================
    // VERSION CONTROL & COLLABORATION
    // ============================================
    {
      id: "git",
      name: "Git",
      icon: <SiGit />,
      color: "#F05032",
      category: "tools",
    },
    {
      id: "github",
      name: "GitHub",
      icon: <SiGithub />,
      color: "#181717",
      category: "tools",
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: <SiBitbucket />,
      color: "#0052CC",
      category: "tools",
    },

    // ============================================
    // DEVOPS & DEPLOYMENT
    // ============================================
    {
      id: "docker",
      name: "Docker",
      icon: <SiDocker />,
      color: "#2496ED",
      category: "tools",
    },
    {
      id: "aws",
      name: "AWS",
      icon: <FaAws />,
      color: "#FF9900",
      category: "tools",
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: <SiVercel />,
      color: "#ffffff",
      category: "tools",
    },
    {
      id: "netlify",
      name: "Netlify",
      icon: <SiNetlify />,
      color: "#00C7B7",
      category: "tools",
    },

    // ============================================
    // PACKAGE MANAGERS
    // ============================================
    {
      id: "npm",
      name: "npm",
      icon: <SiNpm />,
      color: "#CB3837",
      category: "tools",
    },
    {
      id: "pnpm",
      name: "pnpm",
      icon: <SiPnpm />,
      color: "#F69220",
      category: "tools",
    },

    // ============================================
    // CODE QUALITY
    // ============================================
    {
      id: "eslint",
      name: "ESLint",
      icon: <SiEslint />,
      color: "#4B32C3",
      category: "tools",
    },
    {
      id: "prettier",
      name: "Prettier",
      icon: <SiPrettier />,
      color: "#F7B93E",
      category: "tools",
    },

    // ============================================
    // DESIGN & PROTOTYPING
    // ============================================
    {
      id: "figma",
      name: "Figma",
      icon: <SiFigma />,
      color: "#F24E1E",
      category: "tools",
    },

    // ============================================
    // API TESTING & DEVELOPMENT
    // ============================================
    {
      id: "postman",
      name: "Postman",
      icon: <SiPostman />,
      color: "#FF6C37",
      category: "tools",
    },

    // ============================================
    // PROJECT MANAGEMENT
    // ============================================
    {
      id: "jira",
      name: "Jira",
      icon: <SiJira />,
      color: "#0052CC",
      category: "tools",
    },
    {
      id: "confluence",
      name: "Confluence",
      icon: <SiConfluence />,
      color: "#172B4D",
      category: "tools",
    },
    {
      id: "notion",
      name: "Notion",
      icon: <SiNotion />,
      color: "#a0a0a0",
      category: "tools",
    },

    // ============================================
    // COMMUNICATION
    // ============================================
    {
      id: "slack",
      name: "Slack",
      icon: <SiSlack />,
      color: "#4A154B",
      category: "tools",
    },

    // ============================================
    // EDITORS & IDEs
    // ============================================
    {
      id: "vscode",
      name: "VS Code",
      icon: <VscVscode />,
      color: "#007ACC",
      category: "tools",
    },

    // ============================================
    // OPERATING SYSTEMS
    // ============================================
    {
      id: "linux",
      name: "Linux",
      icon: <SiLinux />,
      color: "#FCC624",
      category: "tools",
    },
    {
      id: "ubuntu",
      name: "Ubuntu",
      icon: <SiUbuntu />,
      color: "#E95420",
      category: "tools",
    },

    // ============================================
    // OTHER
    // ============================================
    {
      id: "markdown",
      name: "Markdown",
      icon: <SiMarkdown />,
      color: "#a0a0a0",
      category: "tools",
    },
  ];

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % techStack.length);
      }, 2000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, techStack.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? techStack.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === techStack.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="tech-carousel-section" aria-label="Tecnologías y herramientas">
      <div className="section-header">
        <h2 className="section-title gradient-text">{t("title")}</h2>
        <p className="section-subtitle">{t("subtitle")}</p>
      </div>

      <div
        className="tech-carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
      >
        <div className="carousel-gradient" />

        <button
          className="carousel-control prev"
          onClick={handlePrev}
          aria-label="Tecnología anterior"
        >
          ←
        </button>

        <button
          className="carousel-control next"
          onClick={handleNext}
          aria-label="Siguiente tecnología"
        >
          →
        </button>

        <div className="tech-carousel">
          <AnimatePresence mode="wait">
            {/* Tech items */}
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.id}
                className={`tech-card ${index === currentIndex ? "active" : ""}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.3,
                  scale: index === currentIndex ? 1 : 0.7,
                  y: index === currentIndex ? 0 : 10,
                }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, type: "spring" }}
                style={
                  {
                    "--tech-color": tech.color,
                  } as React.CSSProperties
                }
                onClick={() => setCurrentIndex(index)}
              >
                <div className="tech-icon-large" style={{ color: tech.color }}>
                  {tech.icon}
                </div>

                <div className="tech-content">
                  <h3 className="tech-name">{tech.name}</h3>
                  <span className="tech-category">{tech.category}</span>

                  <div className="tech-badge">
                    <span className="badge-dot" style={{ background: tech.color }} />
                    <span className="badge-text">{t("badge")}</span>
                  </div>
                </div>

                <div className="tech-glow" style={{ background: tech.color }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="carousel-indicators">
          {techStack.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a tecnología ${index + 1}`}
            />
          ))}
        </div>

        <div className="tech-mini-grid">
          {techStack.map((tech, index) => (
            <motion.div
              key={`mini-${tech.id}`}
              className={`mini-tech-item ${index === currentIndex ? "active" : ""}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentIndex(index)}
              style={{ color: tech.color }}
              title={tech.name}
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
