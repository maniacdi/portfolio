export interface Travel {
  id: string;
  title: string;
  description: string;
  location: {
    country: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  date: {
    start: string; // ISO string
    end: string;
  };
  type: "vacation" | "business" | "adventure" | "cultural";
  photos: string[]; // image URLs
  highlights: string[];
  isFeatured: boolean;
}
