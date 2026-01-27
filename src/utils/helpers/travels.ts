import { Travel } from "../types/Travel";

export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    vacation: "#00f3ff",
    business: "#3a86ff",
    adventure: "#ff006e",
    cultural: "#ffd700",
    Vacation: "#00f3ff",
    Business: "#3a86ff",
    Adventure: "#ff006e",
    Cultural: "#ffd700",
    Vacaciones: "#00f3ff",
    Negocios: "#3a86ff",
    Aventura: "#ff006e",
  };
  return colors[type] || "#fff";
};

export const getDuration = (travel: Travel) => {
  const start = new Date(travel.date.start);
  const end = new Date(travel.date.end);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays}`;
};

export const formatDate = (dateString: string, locale: string) => {
  return new Date(dateString).toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
};

export const getTypeLabel = (type: string, t: (key: string) => string): string => {
  const labels: Record<string, string> = {
    vacation: t("vacation"),
    business: t("business"),
    adventure: t("adventure"),
    cultural: t("cultural"),
  };
  return labels[type] || type;
};
