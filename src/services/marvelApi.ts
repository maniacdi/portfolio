import { Character, ApiResponse, Comic } from '../types/marvel';

const API_URL = 'http://gateway.marvel.com/v1/public';
const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;
const MD5 = process.env.REACT_APP_MARVEL_MD5;

export const fetchCharacters = async (
  searchText?: string,
  offset: number = 0
): Promise<{ results: Character[]; total: number }> => {
  try {
    const url = new URL(`${API_URL}/characters`);
    url.searchParams.append('ts', '1');
    url.searchParams.append('apikey', API_KEY!);
    url.searchParams.append('hash', MD5!);
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

    return { results: data.data.results, total: data.data.total };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { results: [], total: 0 };
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

    if (!data.data || !data.data.results || data.data.results.length === 0) {
      throw new Error('Invalid API response');
    }

    return data.data.results[0];
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    return null;
  }
};

export const fetchComicsByCharacterId = async (
  characterId: string,
  limit: number = 20
): Promise<Comic[]> => {
  try {
    const url = new URL(`${API_URL}/characters/${characterId}/comics`);
    url.searchParams.append('ts', '1');
    url.searchParams.append('apikey', API_KEY!);
    url.searchParams.append('hash', MD5!);
    url.searchParams.append('orderBy', 'onsaleDate');
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString());
    const data: ApiResponse<Comic[]> = await response.json();

    if (!data.data || !data.data.results) {
      throw new Error('Invalid API response');
    }

    return data.data.results;
  } catch (error) {
    console.error('Error fetching comics:', error);
    return [];
  }
};
