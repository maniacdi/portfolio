import { Press_Start_2P } from "next/font/google";

// Arcade lettering (hero damage numbers, the 404 "GAME OVER"). Not preloaded,
// so it never competes with the LCP; exposes --font-pixel.
export const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  variable: "--font-pixel",
});
