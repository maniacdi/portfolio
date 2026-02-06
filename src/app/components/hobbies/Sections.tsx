import { HobbySection } from "@/utils/types/Hobby";
import { HobbyCard } from "./HobbyCard";
import { SectionHeader } from "./SectionHeader";
import { useTranslations } from "next-intl";
import { useGlobalStore } from "@/app/store/useGlobalStore";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import "./Sections.scss";

interface Props {
  section: HobbySection;
  searchQuery?: string;
  showOnlyFavorites?: boolean;
  gridColumns?: 2 | 3 | 4;
}

export const Sections = ({
  section,
  searchQuery = "",
  showOnlyFavorites = false,
  gridColumns = 3,
}: Props) => {
  const t = useTranslations("hobbies");
  const { favoriteAnime, favoriteGames, favoriteDrawings, favoriteCookings } = useGlobalStore();

  const getCategoryType = (): "anime" | "games" | "drawings" | "cooking" => {
    switch (section.id) {
      case "anime":
        return "anime";
      case "videogames":
        return "games";
      case "drawing":
        return "drawings";
      case "cooking":
        return "cooking";
      default:
        return "anime";
    }
  };

  const categoryType = getCategoryType();

  const getFavoritesList = () => {
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

  const favoritesList = getFavoritesList();

  let filteredItems = section.items;

  if (searchQuery.trim()) {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (showOnlyFavorites) {
    filteredItems = filteredItems.filter((item) => favoritesList.includes(item.id));
  }

  const totalItems = section.items.length;
  const favoritesCount = section.items.filter((item) => favoritesList.includes(item.id)).length;
  const resultsCount = filteredItems.length;

  return (
    <div className="section-wrapper">
      <SectionHeader title={section.title} description={t(`${section.id}.description` as any)} />

      <div className="stats-container">
        <div className="stat">
          <span className="stat-value">{totalItems} </span>
          <span className="stat-label">{t("total")}</span>
        </div>
        <div className="stat">
          <span className="stat-value neon">{favoritesCount} </span>
          <span className="stat-label">{t("favorites")}</span>
        </div>
        {(searchQuery || showOnlyFavorites) && (
          <div className="stat">
            <span className="stat-value accent">{resultsCount} </span>
            <span className="stat-label">{t("results")}</span>
          </div>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className={`cards-grid grid-${gridColumns}`}>
          {filteredItems.map((item, index) => (
            <HobbyCard
              key={item.slug || item.id}
              item={item}
              index={index}
              categoryType={categoryType}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SearchX size={64} className="empty-icon" />
          <h3 className="empty-title">{t("noResults")}</h3>
          <p className="empty-description">
            {showOnlyFavorites
              ? "You haven't marked any favorites in this category yet."
              : searchQuery
                ? `No items match "${searchQuery}". Try a different search term.`
                : "No items available."}
          </p>
        </motion.div>
      )}
    </div>
  );
};
