import React, { createContext, useState, ReactNode, FC } from 'react';
import { Character } from '../types/marvel';

interface MarvelContextProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  favorites: Character[];
  setFavorites: React.Dispatch<React.SetStateAction<Character[]>>;
}

const MarvelContext = createContext<MarvelContextProps | undefined>(undefined);

const MarvelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);

  return (
    <MarvelContext.Provider
      value={{ characters, setCharacters, favorites, setFavorites }}
    >
      {children}
    </MarvelContext.Provider>
  );
};

export { MarvelContext, MarvelProvider };
