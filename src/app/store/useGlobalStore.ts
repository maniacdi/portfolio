import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  isLoading: boolean;
  loadingMessage: string;

  userLocation: string | null;
  visitedPages: string[];
  dismissedNotifications: string[];

  favoriteAnime: string[];
  favoriteGames: string[];
  favoriteDrawings: string[];
  favoriteCookings: string[];

  setLoading: (loading: boolean, message?: string) => void;
  setUserLocation: (location: string) => void;
  addVisitedPage: (page: string) => void;
  dismissNotification: (id: string) => void;
  toggleFavorite: (type: "anime" | "games" | "drawings" | "cooking", id: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      isLoading: false,
      loadingMessage: "Loading...",
      userLocation: null,
      visitedPages: [],
      dismissedNotifications: [],
      favoriteAnime: [],
      favoriteGames: [],
      favoriteDrawings: [],
      favoriteCookings: [],

      setLoading: (isLoading, message = "Loading...") =>
        set({ isLoading, loadingMessage: message }),
      setUserLocation: (location) => set({ userLocation: location }),
      addVisitedPage: (page) =>
        set((state) => ({
          visitedPages: [...new Set([...state.visitedPages, page])],
        })),
      dismissNotification: (id) =>
        set((state) => ({
          dismissedNotifications: [...state.dismissedNotifications, id],
        })),
      toggleFavorite: (type, id) =>
        set((state) => {
          const key =
            `favorite${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof GlobalState;
          const currentFavorites = state[key] as string[];

          return {
            [key]: currentFavorites.includes(id)
              ? currentFavorites.filter((itemId) => itemId !== id)
              : [...currentFavorites, id],
          };
        }),
    }),
    {
      name: "portfolio-store",
      partialize: (state) => ({
        userLocation: state.userLocation,
        favoriteAnime: state.favoriteAnime,
        favoriteGames: state.favoriteGames,
        favoriteDrawings: state.favoriteDrawings,
        favoriteCookings: state.favoriteCookings,
        dismissedNotifications: state.dismissedNotifications,
      }),
    }
  )
);
