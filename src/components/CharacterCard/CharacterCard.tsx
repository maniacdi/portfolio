import React from 'react';
import { Character } from '../../types/marvel';
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
      <h3 className='character-card__name'>{character.name}</h3>
    </div>
  );
};
export default CharacterCard;
