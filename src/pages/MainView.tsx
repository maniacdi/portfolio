import React, { useContext, useEffect, useState, useCallback } from 'react';
import { MarvelContext } from '../context/MarvelContext';
import { fetchCharacters } from '../services/marvelApi';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header/Header';
import { debounce } from 'lodash';
import { Character } from '../types/marvel';
import logo from '../assets/logo512.png';

const MainView: React.FC = () => {
  const context = useContext(MarvelContext);
  const { characters, setCharacters } = context;
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      const fetchedCharacters = await fetchCharacters();
      if (fetchedCharacters.length > 0) {
        setCharacters(fetchedCharacters);
        setFilteredCharacters(fetchedCharacters);
      }
      setLoading(false);
    };
    getCharacters();
  }, [setCharacters]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query === '') {
        setFilteredCharacters(characters);
      } else {
        const filtered = characters.filter((character: Character) =>
          character.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCharacters(filtered);
      }
    }, 300),
    [characters]
  );

  const handleFavoritesClick = () => {
    console.log('Favorites clicked');
  };

  return (
    <div>
      <Header logo={logo} onFavoritesClick={handleFavoritesClick} />
      <SearchBar onSearch={handleSearch} disabled={loading} />
      {loading ? (
        <Loader />
      ) : (
        <div className='character-list'>
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainView;
