export interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: Image;
  comics: ComicList;
}

export interface ApiResponse<T> {
  data: {
    results: T;
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}

export interface Image {
  path: string;
  extension: string;
}

export interface ComicList {
  available: number;
  items: Array<{ name: string }>;
}
