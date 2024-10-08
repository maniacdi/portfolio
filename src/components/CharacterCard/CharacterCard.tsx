import React from 'react';
import { Character } from '../../types/marvel';
import useFavorites from '../../hooks/useFavorites';
import whiteHeart from '../../assets/out-white-heart.svg';
import redHeart from '../../assets/red-heart.svg';
import { Link } from 'react-router-dom';

import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };
  return (
    <div className="character-card">
      <Link to={`/character/${character.id}`}>
        <img
          className="character-card__image"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </Link>
      <div className="character-card__details">
        <p className="character-card__details-name">{character.name}</p>
        <img
          className="character-card__details-fav"
          src={isFavorite ? redHeart : whiteHeart}
          alt={'Favorite'}
          onClick={handleFavoriteClick}
        />
      </div>
    </div>
  );
};

export default CharacterCard;
