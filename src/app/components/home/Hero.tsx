"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import SceneSphere from "./SceneSphere";
import { useTranslations } from "next-intl";

import "./Hero.scss";

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("hero");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yTitle: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const ySubtitle: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const yBg: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="hero3d-root" aria-label="Hero">
      {/* 3D Canvas */}
      <div className="hero3d-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />

          <SceneSphere />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>

      {/* Overlay Background Parallax */}
      <motion.div className="hero3d-overlay" style={{ translateY: yBg }} />

      {/* Text Content */}
      <div className="hero3d-content">
        <motion.h1
          className="hero3d-title"
          style={{ translateY: yTitle }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="hero3d-sub"
          style={{ translateY: ySubtitle }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="hero3d-ctas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.35 }}
        >
          <a href="#more-about-me" className="btn-primary">
            {t("ctaPrimary")}
          </a>
          <a href="mailto:magaldi6@gmail.com" className="btn-ghost">
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
