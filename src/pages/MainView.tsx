import React, { useContext, useEffect } from 'react';
import { MarvelContext } from '../context/MarvelContext';
import { fetchCharacters } from '../services/marvelApi';

const MainView: React.FC = () => {
  const context = useContext(MarvelContext);

  if (!context) {
    return null; // or throw an error
  }

  const { characters, setCharacters } = context;

  useEffect(() => {
    const getCharacters = async () => {
      const fetchedCharacters = await fetchCharacters();
      setCharacters(fetchedCharacters);
    };
    getCharacters();
  }, [setCharacters]);

  return (
    <div>
      <div className='character-list'></div>
    </div>
  );
};

export default MainView;
