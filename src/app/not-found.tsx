"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { ArrowLeft, Home, Terminal } from "lucide-react";

import "./not-found.scss";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
const ERROR_LINES = [
  "$ curl -I /this-page",
  "> HTTP/1.1 404 Not Found",
  "> X-Error: PAGE_DOES_NOT_EXIST",
  "$ echo $?",
  "> 1",
  "$ suggest --fix",
  "> Try navigating to the homepage instead.",
];

export default function NotFound() {
  const [displayedLines, setDisplayedLines] = useState(0);
  const [glitchText, setGlitchText] = useState("404");

  // Terminal typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLines((prev) => {
        if (prev >= ERROR_LINES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Glitch effect on 404
  useEffect(() => {
    const interval = setInterval(() => {
      const glitched = "404"
        .split("")
        .map((char) =>
          Math.random() > 0.7
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : char
        )
        .join("");
      setGlitchText(glitched);

      setTimeout(() => setGlitchText("404"), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="not-found-page">
      <div className="nf-background">
        <div className="nf-grid-overlay" />
        <div className="nf-gradient-orb" />
      </div>

      <div className="nf-container">
        {/* Big 404 */}
        <motion.div
          className="nf-code"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <span className="nf-number" data-text="404">
            {glitchText}
          </span>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          className="nf-terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="nf-terminal-header">
            <Terminal size={14} />
            <span>terminal ~/404</span>
            <div className="nf-dots">
              <span className="dot close" />
              <span className="dot min" />
              <span className="dot max" />
            </div>
          </div>
          <div className="nf-terminal-body">
            {ERROR_LINES.slice(0, displayedLines).map((line, i) => (
              <motion.div
                key={i}
                className="nf-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={
                    line.startsWith("$")
                      ? "cmd"
                      : line.includes("404") || line.includes("ERROR")
                        ? "error"
                        : "output"
                  }
                >
                  {line}
                </span>
              </motion.div>
            ))}
            {displayedLines < ERROR_LINES.length && (
              <span className="nf-cursor">▋</span>
            )}
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          className="nf-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Parece que esta ruta no existe. Quizá fue un enlace antiguo, o simplemente un typo.
        </motion.p>

        {/* Actions — only 2 relevant buttons */}
        <motion.div
          className="nf-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a href="/" className="nf-btn primary">
            <Home size={16} />
            <span>Ir al inicio</span>
          </a>
          <button
            onClick={() => window.history.back()}
            className="nf-btn secondary"
          >
            <ArrowLeft size={16} />
            <span>Volver atrás</span>
          </button>
        </motion.div>
      </div>
    </main>
  );
}
