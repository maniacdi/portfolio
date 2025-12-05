import { Anime } from "../types/Anime";
import { slugify } from "../helpers/slug";

const defaultImg = "/images/anime/default.png";

export const animeList: Anime[] = [
  { title: "One Piece", favorite: true, image: "/images/anime/one-piece.jpg" },
  { title: "Naruto", favorite: true, image: "/images/anime/naruto.jpg" },
  { title: "Bleach", favorite: false },
  { title: "Kimetsu no Yaiba", favorite: false },
  { title: "Frieren", favorite: true },
  { title: "Shingeki no Kyojin", favorite: false },
  { title: "Anohana", favorite: false },
  { title: "Fairy Tail", favorite: false },
  { title: "Full Metal Alchemist", favorite: true },
  { title: "Akame Ga Kill!", favorite: true },
  { title: "A Silent Voice", favorite: true },
  { title: "Death Note", favorite: false },
  { title: "Jujutsu Kaisen", favorite: true },
  { title: "Erased", favorite: true },
  { title: "One Punch Man", favorite: false },
  { title: "Dororo", favorite: true },
  { title: "SAO", favorite: false },
  { title: "Owari no Seraph", favorite: false },
  { title: "Soul Eater", favorite: true },
  { title: "Parasyte", favorite: false },
  { title: "Mashle", favorite: false },
  { title: "Chainsaw Man", favorite: false },
  { title: "Captain Tsubasa", favorite: false },
  { title: "Cyberpunk Edgerunners", favorite: true },
  { title: "Code Geass", favorite: true },
  { title: "Kill la Kill", favorite: true },
  { title: "Assassination Classroom", favorite: false },
  { title: "Princess Mononoke", favorite: true },
  { title: "Dr. Stone", favorite: false },
].map((anime) => ({
  ...anime,
  slug: slugify(anime.title),
  image: anime.image ?? defaultImg,
}));
