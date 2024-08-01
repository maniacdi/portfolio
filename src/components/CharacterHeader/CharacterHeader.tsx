import React, { useContext } from 'react';
import { Character } from '../../types/marvel';
import { MarvelContext } from '../../context/MarvelContext';
import whiteHeart from '../../assets/out-white-heart.svg';
import redHeart from '../../assets/red-heart.svg';

import './CharacterHeader.scss';

interface CharacterHeaderProps {
  character: Character;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(MarvelContext);
  const isFavorite = favorites.some((fav) => fav.id === character?.id);

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
  );
};

export default CharacterHeader;
