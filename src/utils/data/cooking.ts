import { slugify } from "@/utils/helpers/slug";
import { HobbyItem } from "@/utils/types/Hobby";

export const cookingList: HobbyItem[] = [
  {
    id: slugify("Italian Cuisine"),
    title: "Italian Cuisine",
    slug: slugify("Italian Cuisine"),
    favorite: true,
    image: "/images/cooking/ita.jpg",
  },
  {
    id: slugify("Sushi Time"),
    title: "Sushi Time",
    slug: slugify("Sushi Time"),
    image: "/images/cooking/sushi.jpg",
  },
  {
    id: slugify("Asian Cuisine"),
    title: "Asian Cuisine",
    slug: slugify("Asian Cuisine"),
    image: "https://res.cloudinary.com/dblcttl2g/image/upload/v1774793737/udon_zjflov.jpg",
  },
  {
    id: slugify("Spanish Cuisine"),
    title: "Spanish Cuisine",
    slug: slugify("Spanish Cuisine"),
    favorite: true,
    image: "/images/cooking/esp.jpg",
  },
  {
    id: slugify("Grilling"),
    title: "Grilling",
    slug: slugify("Grilling"),
    image: "/images/cooking/grill.jpg",
  },
];
