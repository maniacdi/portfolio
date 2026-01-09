// components/about/TechCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, 
  SiMongodb, SiExpress, SiTailwindcss, SiSass,
  SiFramer, SiVercel, SiGit, SiDocker, SiPostgresql,
  SiGraphql, SiRedis, SiJest, SiCypress, SiStorybook
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import "./TechCarousel.scss";

interface TechItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  category: "frontend" | "backend" | "tools" | "database";
}

export default function TechCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Tecnologías organizadas por categoría
  const techStack: TechItem[] = [
    // Frontend
    { id: "react", name: "React", icon: <SiReact />, color: "#61DAFB", category: "frontend" },
    { id: "nextjs", name: "Next.js", icon: <SiNextdotjs />, color: "#000000", category: "frontend" },
    { id: "typescript", name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", category: "frontend" },
    { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", category: "frontend" },
    { id: "sass", name: "Sass", icon: <SiSass />, color: "#CC6699", category: "frontend" },
    { id: "framer", name: "Framer Motion", icon: <SiFramer />, color: "#FF4EDD", category: "frontend" },
    { id: "threejs", name: "Three.js", icon: <TbBrandThreejs />, color: "#000000", category: "frontend" },
    
    // Backend
    { id: "nodejs", name: "Node.js", icon: <SiNodedotjs />, color: "#339933", category: "backend" },
    { id: "express", name: "Express", icon: <SiExpress />, color: "#000000", category: "backend" },
    { id: "graphql", name: "GraphQL", icon: <SiGraphql />, color: "#E10098", category: "backend" },
    
    // Databases
    { id: "mongodb", name: "MongoDB", icon: <SiMongodb />, color: "#47A248", category: "database" },
    { id: "postgresql", name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", category: "database" },
    { id: "redis", name: "Redis", icon: <SiRedis />, color: "#DC382D", category: "database" },
    
    // Tools & DevOps
    { id: "git", name: "Git", icon: <SiGit />, color: "#F05032", category: "tools" },
    { id: "docker", name: "Docker", icon: <SiDocker />, color: "#2496ED", category: "tools" },
    { id: "aws", name: "AWS", icon: <FaAws />, color: "#FF9900", category: "tools" },
    { id: "vercel", name: "Vercel", icon: <SiVercel />, color: "#000000", category: "tools" },
    { id: "jest", name: "Jest", icon: <SiJest />, color: "#C21325", category: "tools" },
    { id: "cypress", name: "Cypress", icon: <SiCypress />, color: "#17202C", category: "tools" },
    { id: "storybook", name: "Storybook", icon: <SiStorybook />, color: "#FF4785", category: "tools" },
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

  // Manejar pausa en hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Navegación manual
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? techStack.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === techStack.length - 1 ? 0 : prev + 1));
  };

  // Filtrar por categoría (opcional)
  const filteredTech = techStack; // Mostrar todas
  // const filteredTech = techStack.filter(t => t.category === "frontend"); // Filtrar por categoría

  return (
    <section className="tech-carousel-section" aria-label="Tecnologías y herramientas">
      <div className="section-header">
        <h2 className="section-title">
          <span className="gradient-text">Tech Stack</span> & Tools
        </h2>
        <p className="section-subtitle">
          Tecnologías y herramientas que uso diariamente para construir productos digitales
        </p>
      </div>

      <div 
        className="tech-carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
      >
        {/* Fondo gradiente animado */}
        <div className="carousel-gradient" />
        
        {/* Controles */}
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

        {/* Carrusel principal */}
        <div className="tech-carousel">
          <AnimatePresence mode="wait">
            {/* Tech items */}
            {filteredTech.map((tech, index) => (
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
                style={{ 
                  '--tech-color': tech.color,
                } as React.CSSProperties}
                onClick={() => setCurrentIndex(index)}
              >
                {/* Icono grande */}
                <div className="tech-icon-large" style={{ color: tech.color }}>
                  {tech.icon}
                </div>

                {/* Contenido */}
                <div className="tech-content">
                  <h3 className="tech-name">{tech.name}</h3>
                  <span className="tech-category">{tech.category}</span>
                  
                  {/* Badge de estado */}
                  <div className="tech-badge">
                    <span className="badge-dot" style={{ background: tech.color }} />
                    <span className="badge-text">Daily Use</span>
                  </div>
                </div>

                {/* Efecto de brillo */}
                <div className="tech-glow" style={{ background: tech.color }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Indicadores */}
        <div className="carousel-indicators">
          {filteredTech.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a tecnología ${index + 1}`}
            />
          ))}
        </div>

        {/* Mini carrusel de todas las tech (barra inferior) */}
        <div className="tech-mini-grid">
          {filteredTech.map((tech, index) => (
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