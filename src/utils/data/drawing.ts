import { HobbyItem } from "@/utils/types/Hobby";
import { slugify } from "@/utils/helpers/slug";

export const drawingList: HobbyItem[] = [
  {
    id: slugify("Sketching"),
    title: "Sketching",
    slug: slugify("Sketching"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Digital Art"),
    title: "Digital Art",
    slug: slugify("Digital Art"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Improvising"),
    title: "Improvising",
    slug: slugify("Improvising"),
    favorite: true,
    image: "/images/anime/default.png",
  },
];
