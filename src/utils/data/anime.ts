import { Anime } from "../types/Anime";
import { slugify } from "../helpers/slug";

const defaultImg = "/images/anime/default.png";

export const animeList: Anime[] = [
  { title: "One Piece", favorite: true, image: "/images/anime/one-piece.jpg" },
  { title: "Naruto", favorite: true, image: "/images/anime/naruto.jpg" },
  { title: "Bleach", favorite: false, image: "/images/anime/bleach.jpg" },
  { title: "Kimetsu no Yaiba", favorite: false, image: "/images/anime/kimetsu.jpg" },
  { title: "Frieren", favorite: true, image: "/images/anime/frieren.jpg" },
  { title: "Shingeki no Kyojin", favorite: false, image: "/images/anime/shingeki.jpg" },
  { title: "Anohana", favorite: false, image: "/images/anime/anohana.jpg" },
  { title: "Fairy Tail", favorite: false, image: "/images/anime/fairy.jpg" },
  { title: "Full Metal Alchemist", favorite: true, image: "/images/anime/fma.jpg" },
  { title: "Akame Ga Kill!", favorite: true, image: "/images/anime/akame.jpg" },
  { title: "A Silent Voice", favorite: true, image: "/images/anime/silent.jpg" },
  { title: "Death Note", favorite: false, image: "/images/anime/death.jpg" },
  { title: "Jujutsu Kaisen", favorite: true, image: "/images/anime/jujutsu.jpg" },
  { title: "Erased", favorite: true, image: "/images/anime/erased.jpg" },
  { title: "Dororo", favorite: true, image: "/images/anime/dororo.jpg" },
  { title: "Soul Eater", favorite: true, image: "/images/anime/soul.jpg" },
  { title: "Parasyte", favorite: false, image: "/images/anime/parasyte.jpg" },
  { title: "Mashle", favorite: false, image: "/images/anime/mashle.jpg" },
  { title: "Chainsaw Man", favorite: false, image: "/images/anime/chainsaw.jpg" },
  { title: "Captain Tsubasa", favorite: false, image: "/images/anime/captain.jpg" },
  { title: "Cyberpunk Edgerunners", favorite: true, image: "/images/anime/cyberpunk.jpg" },
  { title: "Code Geass", favorite: true, image: "/images/anime/code.jpg" },
  { title: "Kill la Kill", favorite: true, image: "/images/anime/kill.jpg" },
  { title: "Assassination Classroom", favorite: false, image: "/images/anime/assasination.jpg" },
  { title: "Princess Mononoke", favorite: true, image: "/images/anime/mononoke.jpg" },
  { title: "Dr. Stone", favorite: false, image: "/images/anime/stone.jpg" },
].map((anime) => ({
  ...anime,
  slug: slugify(anime.title),
  image: anime.image ?? defaultImg,
}));
