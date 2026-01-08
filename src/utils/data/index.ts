import { drawingList } from "./drawing";
import { animeList } from "./anime";
import { videoGamesList } from "./videoGames";
import { cookingList } from "./cooking";
import { HobbySection } from "@/utils/types/Hobby";

export const sectionsData: HobbySection[] = [
  {
    id: "anime",
    title: "Anime",
    items: animeList,
  },
  {
    id: "video-games",
    title: "Video Games",
    items: videoGamesList,
  },
  {
    id: "cooking",
    title: "Cooking",
    items: cookingList,
  },
  {
    id: "drawing",
    title: "Drawing",
    items: drawingList,
  },
];
