export interface HobbyItem {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  rating?: number;
  year?: number;
  genre?: string[];
  [key: string]: any; // Additional flexible fields
}

export interface HobbySection {
  id: string;
  title: string;
  items: HobbyItem[];
}
