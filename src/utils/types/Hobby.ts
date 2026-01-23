export interface HobbyItem {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export interface HobbySection {
  id: string;
  title: string;
  items: HobbyItem[];
}
