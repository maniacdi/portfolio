import { HobbyItem } from "@/utils/types/Hobby";
import { slugify } from "@/utils/helpers/slug";

export const videoGamesList: HobbyItem[] = [
  {
    id: slugify("Zelda"),
    title: "Zelda",
    slug: slugify("Zelda"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Final Fantasy"),
    title: "Final Fantasy",
    slug: slugify("Final Fantasy"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Pokemon"),
    title: "Pokemon",
    slug: slugify("Pokemon"),
    favorite: true,
    image: "/images/anime/default.png",
  },
];
