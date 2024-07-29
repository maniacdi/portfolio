import { Character, ApiResponse } from '../types/marvel';

const API_URL = 'http://gateway.marvel.com/v1/public';
const API_KEY = 'tu_api_key_aqui';

export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch(`${API_URL}/characters?apikey=${API_KEY}`);
  const data: ApiResponse<Character[]> = await response.json();
  return data.data.results;
};

// Otras funciones para la API
