import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchCharacterById,
  fetchComicsByCharacterId,
} from '../services/marvelApi';
import { Character, Comic } from '../types/marvel';
import { MarvelContext } from '../context/MarvelContext';

import ComicList from '../components/ComicList/ComicList';
import CharacterHeader from '../components/CharacterHeader/CharacterHeader';

const CharacterDetail: React.FC = () => {
  const context = useContext(MarvelContext);
  const { loading, setLoading } = context;
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCharacter = await fetchCharacterById(id || '');
        if (fetchedCharacter) {
          setCharacter(fetchedCharacter);
          const fetchedComics = await fetchComicsByCharacterId(id || '');
          setComics(fetchedComics);
        } else {
          setError('Character not found');
        }
      } catch (error) {
        setError('Error fetching character details');
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
    // eslint-disable-next-line
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='character-detail'>
      {!loading && character && <CharacterHeader character={character} />}
      {!loading && comics.length > 0 && <ComicList list={comics} />}
    </div>
  );
};

export default CharacterDetail;
