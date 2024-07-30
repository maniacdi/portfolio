import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterById } from '../services/marvelApi';
import { Character } from '../types/marvel';
import { MarvelContext } from '../context/MarvelContext';
import whiteHeart from '../assets/white-out-heart.png';
import redHeart from '../assets/red-heart.png';

const CharacterDetail: React.FC = () => {
  const context = useContext(MarvelContext);
  const {
    setCharacters,
    favorites,
    loading,
    setLoading,
    addFavorite,
    removeFavorite,
  } = context;
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isFavorite = favorites.some((fav) => fav.id === character?.id);
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
  const handleFavoriteClick = () => {
    if (character) {
      if (isFavorite) {
        removeFavorite(character?.id);
      } else {
        addFavorite(character);
      }
    }
  };
  return (
    <div className='character-detail'>
      {character && (
        <div className='character-detail__header'>
          <img
            className='character-detail__image'
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className='character-detail__header-text'>
            <div className='character-detail__header-text__title'>
              <h1 className='character-detail__name'>{character.name}</h1>{' '}
              <img
                className='character-details__fav'
                src={isFavorite ? redHeart : whiteHeart}
                alt={'Favorite'}
                onClick={handleFavoriteClick}
              />
            </div>
            <p className='character-detail__description'>
              {character.description || 'No description available'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
