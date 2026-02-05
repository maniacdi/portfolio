"use client";

import { useState } from "react";
import { Sections } from "./Sections";
import { sectionsData } from "@/utils/data";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, X, Grid3x3, Grid2x2, LayoutGrid, Heart } from "lucide-react";
import "./HobbyTabs.scss";

export default function HobbyTabs() {
  const [active, setActive] = useState<string>("anime");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(4);
  const t = useTranslations("hobbies.categories");

  const translatedSections = sectionsData.map((section) => ({
    ...section,
    title: t(section.id),
  }));

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const activeSection = translatedSections.find((s) => s.id === active)!;

  return (
    <div className="hobbies-container">
      <div className="hobbies-tabs">
        {translatedSections.map((section) => (
          <motion.button
            key={section.id}
            className={`tab-btn ${active === section.id ? "active" : ""}`}
            onClick={() => {
              setActive(section.id);
              setSearchQuery("");
              setShowOnlyFavorites(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="tab-label">{section.title}</span>
            {active === section.id && (
              <motion.div
                className="tab-indicator"
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="controls-container">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder={`Search ${activeSection.title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <motion.button
              className="clear-btn"
              onClick={handleClearSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} />
            </motion.button>
          )}
        </div>

        <div className="filters-container">
          <motion.button
            className={`filter-btn ${showOnlyFavorites ? "active" : ""}`}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Show only favorites"
          >
            <Heart size={18} className={showOnlyFavorites ? "filled" : ""} />
            <span>Favorites</span>
          </motion.button>

          <div className="separator" />

          <div className="grid-controls">
            <motion.button
              className={`grid-btn ${gridColumns === 2 ? "active" : ""}`}
              onClick={() => setGridColumns(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid2x2 size={18} />
            </motion.button>
            <motion.button
              className={`grid-btn ${gridColumns === 3 ? "active" : ""}`}
              onClick={() => setGridColumns(3)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3x3 size={18} />
            </motion.button>
            <motion.button
              className={`grid-btn ${gridColumns === 4 ? "active" : ""}`}
              onClick={() => setGridColumns(4)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LayoutGrid size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${searchQuery}-${showOnlyFavorites}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Sections
            section={activeSection}
            searchQuery={searchQuery}
            showOnlyFavorites={showOnlyFavorites}
            gridColumns={gridColumns}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}