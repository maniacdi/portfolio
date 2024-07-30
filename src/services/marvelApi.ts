import { Character, ApiResponse } from '../types/marvel';

const API_URL = 'http://gateway.marvel.com/v1/public';
const API_KEY = '1daf6cf594dc2df417c2c3ddfca3ab88';
const MD5 = '2a701329d07892b26769a4b9948c29ca';

export const fetchCharacters = async (
  searchText?: string,
  offset: number = 0
): Promise<Character[]> => {
  try {
    const url = new URL(`${API_URL}/characters`);
    url.searchParams.append('ts', '1');
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('hash', MD5);
    url.searchParams.append('limit', '50');
    url.searchParams.append('offset', offset.toString());

    if (searchText) {
      url.searchParams.append('nameStartsWith', searchText);
    }

    const response = await fetch(url.toString());
    const data: ApiResponse<Character[]> = await response.json();

    if (!data.data || !data.data.results) {
      throw new Error('Invalid API response');
    }

    return data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

export const fetchCharacterById = async (
  id: string
): Promise<Character | null> => {
  try {
    const response = await fetch(
      `${API_URL}/characters/${id}?ts=1&apikey=${API_KEY}&hash=${MD5}`
    );
    const data: ApiResponse<Character[]> = await response.json();

    // Asegúrate de que `results` es un array de `Character`
    if (!data.data || !data.data.results || data.data.results.length === 0) {
      throw new Error('Invalid API response');
    }

    return data.data.results[0]; // Retorna el primer personaje
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    return null;
  }
};
