import React from 'react';
import { Character } from '../../types/marvel';
import whiteHeart from '../../assets/white-out-heart.png';
import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className='character-card'>
      <img
        className='character-card__image'
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <div className='character-card__details'>
        <p className='character-card__details-name'>{character.name}</p>
        <img
          className='character-card__details-fav'
          src={whiteHeart}
          alt={'Charter fav'}
        />
      </div>
    </div>
  );
};
export default CharacterCard;
