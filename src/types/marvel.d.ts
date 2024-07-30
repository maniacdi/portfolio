export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Image;
  comics: ComicList;
}

export interface ApiResponse<T> {
  data: {
    results: T;
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
