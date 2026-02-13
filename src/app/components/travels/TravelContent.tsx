"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Map, List, Filter, Search, Globe, Calendar, Star, Kayak, TreePalm } from "lucide-react";
import TravelMap from "./TravelMap";
import TravelCard from "./TravelCard";
import TravelModal from "./TravelModal";
import { fetchAllTravels } from "../../services/travelService";
import { Travel } from "@/utils/types/Travel";
import { useToast } from "@/app/components/toast/ToastProvider";
import "./TravelContent.scss";

export default function TravelContent() {
  const t = useTranslations("travels");
  const toast = useToast();
  
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadTravels();
  }, []);

  const loadTravels = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const data = await fetchAllTravels();
      
      if (!data || data.length === 0) {

        toast.warning("No se encontraron viajes disponibles");
        setTravels([]);
      } else {

        setTravels(data);
        toast.success(`${data.length} viajes cargados correctamente`);
      }
    } catch (err) {

      console.error("Error loading travels:", err);
      setError(true);
      setTravels([]);
      
      toast.error(
        "Error al cargar los viajes. Por favor, intenta recargar la página.",
        8000
      );
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: "all", label: t("all"), icon: <Globe size={16} /> },
    { id: "vacation", label: t("vacation"), icon: <TreePalm size={16} /> },
    { id: "business", label: t("business"), icon: <Calendar size={16} /> },
    { id: "adventure", label: t("adventure"), icon: <Kayak size={16} /> },
    { id: "cultural", label: t("cultural"), icon: <Star size={16} /> },
  ];

  const filteredTravels = travels.filter((travel) => {
    const matchesFilter = filter === "all" || travel.type === filter;
    const matchesSearch =
      search === "" ||
      travel.title.toLowerCase().includes(search.toLowerCase()) ||
      travel.location.country.toLowerCase().includes(search.toLowerCase()) ||
      travel.location.city.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleTravelClick = (travel: Travel) => {
    setSelectedTravel(travel);
    setIsModalOpen(true);
  };

  const handleRetry = () => {
    toast.info("Recargando viajes...");
    loadTravels();
  };

  return (
    <div className="travels-page">
      {/* Hero Section */}
      <div className="travels-hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="travels-title"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="travels-description"
        >
          {t("description")}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="travels-controls">
        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "map" ? "active" : ""}`}
            onClick={() => setViewMode("map")}
            disabled={loading || error}
          >
            <Map size={18} />
            <span>{t("mapView")}</span>
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            disabled={loading || error}
          >
            <List size={18} />
            <span>{t("listView")}</span>
          </button>
        </div>

        {/* Search */}
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading || error}
          />
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filters-label">
            <Filter size={16} />
            <span>{t("filterBy")}:</span>
          </div>
          <div className="filter-buttons">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                className={`filter-btn ${filter === filterItem.id ? "active" : ""}`}
                onClick={() => setFilter(filterItem.id)}
                disabled={loading || error}
              >
                {filterItem.icon}
                <span>{filterItem.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="travels-content">
        {loading ? (
          <div className="travels-loading">
            <div className="loader"></div>
            <p>Cargando viajes...</p>
          </div>
        ) : error ? (
          <div className="travels-error">
            <div className="error-icon">⚠️</div>
            <h3>Error al cargar los viajes</h3>
            <p>No se pudieron cargar los datos. Por favor, intenta de nuevo.</p>
            <button className="retry-button" onClick={handleRetry}>
              🔄 Reintentar
            </button>
          </div>
        ) : travels.length === 0 ? (
          <div className="travels-empty">
            <div className="empty-icon">🗺️</div>
            <h3>No hay viajes disponibles</h3>
            <p>Aún no hay viajes registrados en el sistema.</p>
          </div>
        ) : filteredTravels.length === 0 ? (
          <div className="travels-empty">
            <div className="empty-icon">🔍</div>
            <h3>No se encontraron resultados</h3>
            <p>Prueba con otros filtros o términos de búsqueda.</p>
          </div>
        ) : viewMode === "map" ? (
          <TravelMap travels={filteredTravels} onMarkerClick={handleTravelClick} />
        ) : (
          <div className="travels-grid">
            {filteredTravels.map((travel, index) => (
              <TravelCard
                key={travel.id}
                travel={travel}
                index={index}
                onClick={() => handleTravelClick(travel)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTravel && (
        <TravelModal
          travel={selectedTravel}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}