export interface HobbyItem {
  id: string;
  title: string;
  slug: string;
  favorite?: boolean;
  image?: string;
}

export interface HobbySection {
  id: string;
  title: string;
  items: HobbyItem[];
}

export interface AnimeBase {
  title: string;
  favorite: boolean;
  image: string;
}
