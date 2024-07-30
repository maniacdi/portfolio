import React, { createContext, useState, ReactNode } from 'react';
import { Character } from '../types/marvel';

interface MarvelContextProps {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}

const defaultValue: MarvelContextProps = {
  characters: [],
  setCharacters: () => {},
};

export const MarvelContext = createContext<MarvelContextProps>(defaultValue);

export const MarvelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  return (
    <MarvelContext.Provider value={{ characters, setCharacters }}>
      {children}
    </MarvelContext.Provider>
  );
};
