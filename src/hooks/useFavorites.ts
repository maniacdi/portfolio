import { useContext } from 'react';
import { MarvelContext } from '../context/MarvelContext';

const useFavorites = () => {
  const context = useContext(MarvelContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a MarvelProvider');
  }

  return context;
};

export default useFavorites;
