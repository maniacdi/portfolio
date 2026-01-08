import { Travel } from "@/utils/types/Travel";

export interface ApiTravel {
  _id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dates: {
    start: string;
    end: string;
  };
  type: "vacation" | "business" | "adventure" | "cultural";
  images: string[];
  highlights: string[];
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export function adaptApiTravelToFrontend(apiTravel: ApiTravel): Travel {
  return {
    id: apiTravel._id,
    title: apiTravel.title,
    description: apiTravel.description,
    location: {
      country: apiTravel.country,
      city: apiTravel.location,
      coordinates: apiTravel.coordinates,
    },
    date: {
      start: apiTravel.dates.start,
      end: apiTravel.dates.end,
    },
    type: apiTravel.type,
    photos: apiTravel.images.length > 0 ? apiTravel.images : [],
    highlights: apiTravel.highlights,
    isFeatured: false,
  };
}

// Función para placeholder cuando no hay imágenes
export function getTravelPlaceholderImage(type: string): string {
  const placeholders: Record<string, string> = {
    vacation: "/images/placeholders/beach.svg",
    business: "/images/placeholders/business.svg",
    adventure: "/images/placeholders/mountain.svg",
    cultural: "/images/placeholders/culture.svg",
  };
  return placeholders[type] || "/images/placeholders/default.svg";
}
