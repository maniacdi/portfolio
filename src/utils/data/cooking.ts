import { HobbyItem } from "@/utils/types/Hobby";
import { slugify } from "@/utils/helpers/slug";

export const cookingList: HobbyItem[] = [
  {
    id: slugify("Baking"),
    title: "Baking",
    slug: slugify("Baking"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Italian Cuisine"),
    title: "Italian Cuisine",
    slug: slugify("Italian Cuisine"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Sushi Making"),
    title: "Sushi Making",
    slug: slugify("Sushi Making"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Asian Cuisine"),
    title: "Asian Cuisine",
    slug: slugify("Asian Cuisine"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Spanish Cuisine"),
    title: "Spanish Cuisine",
    slug: slugify("Spanish Cuisine"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Grilling"),
    title: "Grilling",
    slug: slugify("Grilling"),
    image: "/images/anime/default.png",
  },
];
