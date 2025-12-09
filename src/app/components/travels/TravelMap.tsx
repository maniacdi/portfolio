"use client";

import { useEffect, useState } from "react";
import { Travel } from "@/utils/types/Travel";
import { useTranslations } from "next-intl";
import "./TravelMap.scss";

// Dynamic imports for Leaflet (client-side only)
import dynamic from "next/dynamic";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Dynamic import for MapContainer (client-side only)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface TravelMapProps {
  travels: Travel[];
  onMarkerClick: (travel: Travel) => void;
}

// Fix for Leaflet icons in Next.js
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import { getTypeColor } from "@/utils/helpers/travels";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

export default function TravelMap({ travels, onMarkerClick }: TravelMapProps) {
  const t = useTranslations("travels");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || travels.length === 0) {
    return (
      <div className="travel-map-placeholder">
        <div className="loading-spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  // Calculate map bounds
  const bounds = L.latLngBounds(
    travels.map((travel) => [travel.location.coordinates.lat, travel.location.coordinates.lng])
  );

  const getMarkerIcon = (type: string) => {
    const iconOptions: L.DivIconOptions = {
      html: `
        <div class="custom-marker ${type}">
          <div class="marker-pulse"></div>
          <div class="marker-icon">
            ${getTypeEmoji(type)}
          </div>
        </div>
      `,
      className: "custom-div-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    };

    return L.divIcon(iconOptions);
  };

  const getTypeEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      vacation: "🏖️",
      business: "💼",
      adventure: "🏔️",
      cultural: "🏛️",
    };
    return emojis[type] || "📍";
  };

  return (
    <div className="travel-map-container">
      <MapContainer bounds={bounds} zoom={1} scrollWheelZoom={true} className="travel-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Dark theme alternative */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {travels.map((travel) => (
          <Marker
            key={travel.id}
            position={[travel.location.coordinates.lat, travel.location.coordinates.lng]}
            icon={getMarkerIcon(travel.type)}
            eventHandlers={{
              click: () => onMarkerClick(travel),
            }}
          >
            <Popup>
              <div className="map-popup">
                <h4>{travel.title}</h4>
                <p className="popup-location">
                  {travel.location.city}, {travel.location.country}
                </p>
                <p className="popup-type" style={{ color: getTypeColor(travel.type) }}>
                  {travel.type}
                </p>
                <button className="popup-btn" onClick={() => onMarkerClick(travel)}>
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <h4>Travel Types</h4>
        {["vacation", "business", "adventure", "cultural"].map((type) => (
          <div key={type} className="legend-item">
            <div className="legend-marker" style={{ background: getTypeColor(type) }}>
              {getTypeEmoji(type)}
            </div>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
