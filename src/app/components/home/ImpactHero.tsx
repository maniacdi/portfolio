"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import "./ImpactHero.scss";

const SimpleSphere = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#ff4edd"
        emissive="#ff4edd"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default function SimpleImpactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={containerRef} className="impact-hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <color attach="background" args={["#0a0e1a"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff4edd" />

            <Stars radius={100} depth={50} count={2000} factor={4} />
            <Sparkles count={100} size={1} speed={0.2} />
            <SimpleSphere />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-content">
        <h1 className="main-title">
          <span className="title-line line-1">BUILDING THE</span>
          <span className="title-line line-2">FUTURE WEB</span>
        </h1>

        <p className="subtitle">{t("subtitle")}</p>

        <div className="cta-wrapper">
          <a href="#about" className="cta-button magnetic-button">
            {t("ctaPrimary")}
          </a>

          <a href="mailto:magaldi6@gmail.com" className="cta-button outline-hover">
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
