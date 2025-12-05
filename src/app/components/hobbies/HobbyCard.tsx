// app/components/hobbies/HobbyCard.tsx (ejemplo actualizado)
"use client";

import { HobbyItem } from "@/utils/types/Hobby";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useGlobalStore } from "@/app/store/useGlobalStore";
import "./HobbyCard.scss";

interface HobbyCardProps {
  item: HobbyItem;
  type: "anime" | "games" | "drawings";
}

export const HobbyCard = ({ item, type }: HobbyCardProps) => {
  const { toggleFavorite, favoriteAnime, favoriteGames, favoriteDrawings } = useGlobalStore();

  // Get the correct favorites array based on type
  const favorites =
    type === "anime" ? favoriteAnime : type === "games" ? favoriteGames : favoriteDrawings;

  const isFavorite = favorites.includes(item.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(type, item.id);
  };

  return (
    <motion.div
      className="hobby-card"
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="image-wrapper">
        <img src={item.image} alt={item.title} />
        <div className="image-overlay"></div>

        {/* Favorite button */}
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="title">{item.title}</p>

      {/* Original favorite dot (optional) */}
      {isFavorite && <span className="fav-dot"></span>}
    </motion.div>
  );
};
