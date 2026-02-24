"use client";

import { useLocale, useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { Calendar, Camera,ChevronRight, MapPin } from "lucide-react";

import { formatDate, getDuration, getTypeColor } from "@/utils/helpers/travels";
import { Travel } from "@/utils/types/Travel";

interface TravelCardProps {
  travel: Travel;
  index: number;
  onClick: () => void;
}

export default function TravelCard({ travel, index, onClick }: TravelCardProps) {
  const t = useTranslations("travels");
  const locale = useLocale();

  return (
    <motion.div
      className="travel-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      style={{ borderLeftColor: getTypeColor(travel.type) }}
    >
      {travel.isFeatured && <div className="featured-badge">⭐ {t("featured")}</div>}

      <div className="travel-card-image">
        {travel.photos[0] ? (
          <img
            src={travel.photos[0]}
            alt={travel.title}
            onError={(e) => {
              e.currentTarget.src = "/images/travels/default.jpg";
            }}
          />
        ) : (
          <div className="no-image">
            <Camera size={32} />
          </div>
        )}
        <div className="image-overlay"></div>
        <div className="travel-type" style={{ background: getTypeColor(travel.type) }}>
          {travel.type}
        </div>
      </div>

      <div className="travel-card-content">
        <div className="travel-header">
          <h3 className="travel-title">{travel.title}</h3>
        </div>

        <div className="travel-info">
          <div className="info-item">
            <MapPin size={14} />
            <span>
              {travel.location.city}, {travel.location.country}
            </span>
          </div>

          <div className="info-item">
            <Calendar size={14} />
            <span>
              {formatDate(travel.date.start, locale)} • {getDuration(travel)} {t("days")}
            </span>
          </div>
        </div>

        <p className="travel-description">{travel.description.substring(0, 100)}</p>

        <div className="travel-highlights">
          {travel.highlights.slice(0, 2).map((highlight, i) => (
            <span key={i} className="highlight-tag">
              {highlight}
            </span>
          ))}
          {travel.highlights.length > 2 && (
            <span className="more-tag">+{travel.highlights.length - 2}</span>
          )}
        </div>

        <div className="button-container">
          <button
            className="view-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {t("viewDetails")} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
