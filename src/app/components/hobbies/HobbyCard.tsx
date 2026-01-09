"use client";

import { HobbyItem } from "@/utils/types/Hobby";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./HobbyCard.scss";

interface HobbyCardProps {
  item: HobbyItem;
}

export const HobbyCard = ({ item }: HobbyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && imgRef.current) {
      const img = new Image();
      img.src = item.image ?? "/images/anime/default.png";
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
    }
  }, [isInView, item.image]);

  return (
    <motion.div
      ref={cardRef}
      className="hobby-card"
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="image-wrapper">
        {!imageLoaded && <div className="image-skeleton" />}

        <img
          ref={imgRef}
          src={isInView ? item.image : "/images/anime/default.png"}
          alt={item.title}
          loading="lazy"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageLoaded(true);
            console.error(`Failed to load image: ${item.image}`);
          }}
        />

        <div className="image-overlay" />
      </div>

      <p className="title">{item.title}</p>
    </motion.div>
  );
};
