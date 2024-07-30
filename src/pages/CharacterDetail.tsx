import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterById } from '../services/marvelApi';
import { Character } from '../types/marvel';
import { MarvelContext } from '../context/MarvelContext';

const CharacterDetail: React.FC = () => {
  const context = useContext(MarvelContext);
  const { setCharacters, favorites, loading, setLoading } = context;
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCharacter = await fetchCharacterById(id || '');
        if (fetchedCharacter) {
          setCharacter(fetchedCharacter);
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
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='character-detail'>
      {character && (
        <>
          <h1>{character.name}</h1>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <p>{character.description || 'No description available'}</p>
        </>
      )}
    </div>
  );
};

export default CharacterDetail;
