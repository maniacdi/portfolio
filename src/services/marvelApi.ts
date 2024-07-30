import { Character, ApiResponse } from '../types/marvel';

const API_URL = 'http://gateway.marvel.com/v1/public';
const API_KEY = '1daf6cf594dc2df417c2c3ddfca3ab88';
const MD5 = '2a701329d07892b26769a4b9948c29ca';

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(
      `${API_URL}/characters?limit=50&ts=1&apikey=${API_KEY}&hash=${MD5}`
    );
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
