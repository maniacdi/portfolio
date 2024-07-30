import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Character } from '../types/marvel';

interface MarvelContextProps {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialFavorites: Character[] = JSON.parse(
  localStorage.getItem('favorites') || '[]'
);

export const MarvelContext = createContext<MarvelContextProps>({
  characters: [],
  setCharacters: () => {},
  favorites: initialFavorites,
  addFavorite: () => {},
  removeFavorite: () => {},
  loading: false,
  setLoading: () => {},
});

export const MarvelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>(initialFavorites);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character: Character) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, character];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((char) => char.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <MarvelContext.Provider
      value={{
        characters,
        setCharacters,
        favorites,
        addFavorite,
        removeFavorite,
        loading,
        setLoading,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};
