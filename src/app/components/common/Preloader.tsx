"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "./Preloader.scss";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const t = useTranslations("preloader");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const preloadAssets = async () => {
      const assets = ["/api/weather"];

      await Promise.all(assets.map((url) => fetch(url)));
    };

    preloadAssets();

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="preloader-content">
        <motion.div
          className="logo-container"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="logo">M</div>
          <div className="logo-glow" />
        </motion.div>

        <div className="preloader-text">
          <h2 className="title">{t("title")}</h2>
          <p className="subtitle">{t("subtitle")}</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            <div className="progress-glow" />
          </div>
          <div className="progress-text">
            <span className="percentage">{progress}%</span>
            <span className="status">{t("loading")}</span>
          </div>
        </div>

        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                x: [null, Math.random() * 200 - 100],
                y: [null, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="console">
          <div className="console-header">
            <span className="console-title">system_init.sh</span>
            <div className="console-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
          </div>
          <div className="console-body">
            <pre className="console-text">
              <span className="line">$ Initializing portfolio...</span>
              <span className="line">$ Loading 3D assets...</span>
              <span className="line">$ Compiling shaders...</span>
              <span className="line">$ Establishing connection...</span>
              <span className="line highlight">$ Welcome, visitor.</span>
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
