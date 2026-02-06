"use client";

import { HobbyItem } from "@/utils/types/Hobby";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useGlobalStore } from "@/app/store/useGlobalStore";
import "./HobbyCard.scss";

interface HobbyCardProps {
  item: HobbyItem;
  index?: number;
  categoryType: "anime" | "games" | "drawings" | "cooking";
}

export const HobbyCard = ({ item, index = 0, categoryType }: HobbyCardProps) => {
  const { toggleFavorite, favoriteAnime, favoriteGames, favoriteDrawings, favoriteCookings } =
    useGlobalStore();

  const getFavorites = () => {
    switch (categoryType) {
      case "anime":
        return favoriteAnime;
      case "games":
        return favoriteGames;
      case "drawings":
        return favoriteDrawings;
      case "cooking":
        return favoriteCookings;
      default:
        return [];
    }
  };

  const isFavorite = getFavorites().includes(item.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(categoryType, item.id);
  };

  return (
    <motion.div
      className="hobby-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={handleToggleFavorite}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={false}
        animate={{
          scale: isFavorite ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={isFavorite ? "filled" : ""} size={20} />
      </motion.button>

      <div className="image-wrapper">
        <Image
          src={item.image ?? "/images/anime/default.png"}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="hobby-image"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxYTFhMjUiLz48L3N2Zz4="
        />
        <div className="image-overlay" />
      </div>
      <p className="title">{item.title}</p>
    </motion.div>
  );
};
