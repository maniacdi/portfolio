import { HobbySection } from "@/utils/types/Hobby";
import { animeList } from "./anime";
import { videoGamesList } from "./videoGames";
import { drawingList } from "./drawing";
import { cookingList } from "./cooking";

export const sectionsData: HobbySection[] = [
  {
    id: "anime",
    title: "Anime",
    items: animeList,
  },
  {
    id: "videogames",
    title: "Video Games",
    items: videoGamesList,
  },
  {
    id: "drawing",
    title: "Drawing",
    items: drawingList,
  },
  {
    id: "cooking",
    title: "Cooking",
    items: cookingList,
  },
];