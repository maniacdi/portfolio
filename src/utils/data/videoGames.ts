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
    id: slugify("League of legends"),
    title: "League of legends",
    slug: slugify("League of legends"),
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Pokemon"),
    title: "Pokemon",
    slug: slugify("Pokemon"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Rocket league"),
    title: "Rocket league",
    slug: slugify("Rocket league"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Mario Bros"),
    title: "Mario Bros",
    slug: slugify("Mario Bros"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("FIFA"),
    title: "FIFA",
    slug: slugify("FIFA"),
    favorite: true,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Minecraft"),
    title: "Minecraft",
    slug: slugify("Minecraft"),
    favorite: false,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Blasphemous"),
    title: "Blasphemous",
    slug: slugify("Blasphemous"),
    favorite: false,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Far Cry"),
    title: "Far Cry",
    slug: slugify("Far Cry"),
    favorite: false,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Assassin's Creed"),
    title: "Assassin's Creed",
    slug: slugify("Assassin's Creed"),
    favorite: false,
    image: "/images/anime/default.png",
  },
  {
    id: slugify("Call of Duty"),
    title: "Call of Duty",
    slug: slugify("Call of Duty"),
    favorite: false,
    image: "/images/anime/default.png",
  },
];
