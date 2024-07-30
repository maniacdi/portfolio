import React from 'react';
import { Character } from '../../types/marvel';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className='character-card'>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <h3>{character.name}</h3>
      <p>{character.description}</p>
    </div>
  );
};
export default CharacterCard;
