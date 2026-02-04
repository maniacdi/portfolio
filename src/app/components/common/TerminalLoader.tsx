"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TerminalLoader.scss";

const commands = [
  "npm run build-portfolio",
  "> Building futuristic interface...",
  "> Loading Three.js modules...",
  "> Initializing particle system...",
  "> Compiling neon shaders...",
  "> Establishing secure connection...",
  "✓ Portfolio ready",
  "$ Welcome to the future of web development",
];

export default function TerminalLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(true); // ← CAMBIO: Ahora empieza en true

  useEffect(() => {
    setShouldShow(true);
    
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= commands.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="terminal-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-title">
              <span className="icon">⎔</span>
              <span>terminal ~/portfolio/init</span>
            </div>
            <div className="terminal-controls">
              <div className="control close" />
              <div className="control minimize" />
              <div className="control expand" />
            </div>
          </div>

          <div className="terminal-body">
            <div className="terminal-content">
              {commands.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  className="terminal-line"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={
                      line.startsWith(">")
                        ? "output"
                        : line.startsWith("✓")
                          ? "success"
                          : line.startsWith("$")
                            ? "command"
                            : "input"
                    }
                  >
                    {line}
                  </span>
                </motion.div>
              ))}

              {visibleLines < commands.length && (
                <div className="terminal-line">
                  <span className="cursor">{showCursor ? "▋" : " "}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hint">
          <span>Initializing experience...</span>
          <div className="spinner" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}