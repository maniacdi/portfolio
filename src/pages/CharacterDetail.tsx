import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchCharacterById,
  fetchComicsByCharacterId,
} from '../services/marvelApi';
import { Character, Comic } from '../types/marvel';
import { MarvelContext } from '../context/MarvelContext';
import whiteHeart from '../assets/out-white-heart.svg';
import redHeart from '../assets/red-heart.svg';

const CharacterDetail: React.FC = () => {
  const context = useContext(MarvelContext);
  const { favorites, loading, setLoading, addFavorite, removeFavorite } =
    context;
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [comics, setComics] = useState<Comic[]>([]);
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
  }, [id]);

  const handleFavoriteClick = () => {
    if (character) {
      if (isFavorite) {
        removeFavorite(character?.id);
      } else {
        addFavorite(character);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='character-detail'>
      {!loading && character && (
        <div className='character-detail__header-container'>
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
        </div>
      )}
      {!loading && comics.length > 0 && (
        <div className='character-detail__comics'>
          <h2>Comics</h2>
          <div className='character-detail__comics-list'>
            {comics.map((comic) => (
              <div key={comic.id} className='comic-card'>
                <img
                  className='comic-card__image'
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <h3 className='comic-card__title'>{comic.title}</h3>
                <p className='comic-card__date'>
                  {comic.dates
                    .find((date) => date.type === 'onsaleDate')
                    ?.date.split('-')[0] || 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
