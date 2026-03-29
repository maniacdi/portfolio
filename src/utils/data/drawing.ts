import { slugify } from "@/utils/helpers/slug";
import { HobbyItem } from "@/utils/types/Hobby";

export const drawingList: HobbyItem[] = [
  {
    id: slugify("Sketching"),
    title: "Sketching",
    slug: slugify("Sketching"),
    favorite: true,
    image: "https://res.cloudinary.com/dblcttl2g/image/upload/v1774793524/sketch_kqfge0.jpg",
  },
  {
    id: slugify("Digital Art"),
    title: "Digital Art",
    slug: slugify("Digital Art"),
    image: "https://res.cloudinary.com/dblcttl2g/image/upload/v1774793687/digital_e8x9kx.png",
  },
  {
    id: slugify("Improvising"),
    title: "Improvising",
    slug: slugify("Improvising"),
    favorite: true,
    image: "/images/anime/default.png",
  },
];
