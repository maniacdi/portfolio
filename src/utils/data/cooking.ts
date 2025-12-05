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
];
