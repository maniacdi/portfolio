import React from 'react';
import { Character } from '../../types/marvel';
import CharacterCard from '../CharacterCard/CharacterCard';

import './CharacterList.scss';

interface CharacterListProps {
  list: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ list }) => {
  return (
    <div className='character-list'>
      {list.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
