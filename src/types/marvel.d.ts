export interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: Image;
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

export interface Comic {
  id: string;
  title: string;
  dates: Array<{ type: string; date: string }>;
  thumbnail: Image;
}
