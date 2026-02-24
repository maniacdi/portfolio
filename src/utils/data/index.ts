import { HobbySection } from "@/utils/types/Hobby";

import { animeList } from "./anime";
import { cookingList } from "./cooking";
import { drawingList } from "./drawing";
import { videoGamesList } from "./videoGames";

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
