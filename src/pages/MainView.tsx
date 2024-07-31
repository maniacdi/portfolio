import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import { MarvelContext } from '../context/MarvelContext';
import { fetchCharacters } from '../services/marvelApi';
import SearchBar from '../components/SearchBar/SearchBar';
import { debounce } from 'lodash';
import { Character } from '../types/marvel';
import CharacterList from '../components/CharacterList/CharacterList';
import '../styles/Main.scss';

interface MainViewProps {
  showFavorites: boolean;
}

const MainView: React.FC<MainViewProps> = ({ showFavorites }) => {
  const context = useContext(MarvelContext);
  const { setCharacters, favorites, loading, setLoading } = context;
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const itemsPerPage: number = 50;
  const fetchPerPage: number = 100;

  const fetchAndSetCharacters = async (searchText: string, page: number) => {
    setLoading(true);
    try {
      const offset =
        Math.floor(((page - 1) * itemsPerPage) / fetchPerPage) * fetchPerPage;

      const localStorageKey = `characters_${searchText}_${offset}`;
      const localStorageData = localStorage.getItem(localStorageKey);

      if (localStorageData) {
        const { results, total } = JSON.parse(localStorageData) as {
          results: Character[];
          total: number;
        };
        if (results.length > 0) {
          setAllCharacters((prevCharacters) => [...prevCharacters, ...results]);
          setTotalResults(total);
        } else {
          const results: Character[] = await fetchCharacters(
            searchText,
            offset
          );
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ results, total })
          );
          setAllCharacters((prevCharacters) => [...prevCharacters, ...results]);
          setTotalResults(total);
        }
      } else {
        const results: Character[] = await fetchCharacters(searchText, offset);
        localStorage.setItem(localStorageKey, JSON.stringify({ results }));
        setAllCharacters((prevCharacters) => [...prevCharacters, ...results]);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetCharacters(searchText, currentPage);
  }, [searchText, currentPage]);

  useEffect(() => {
    const filtered = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchText, allCharacters]);

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchText(query);
        setCurrentPage(1);
      }, 300),
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      debouncedHandleSearch(query);
    },
    [debouncedHandleSearch]
  );

  const charactersToDisplay = showFavorites ? favorites : filteredCharacters;

  const paginatedCharacters = charactersToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        disabled={loading}
        itemCount={paginatedCharacters.length}
      />
      <CharacterList list={paginatedCharacters} />
      <div className='main-view_pagination'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => {
            if (currentPage * itemsPerPage < totalResults) {
              setCurrentPage((prev) => prev + 1);
              if ((currentPage + 1) % (fetchPerPage / itemsPerPage) === 0) {
                fetchAndSetCharacters(searchText, currentPage + 1);
              }
            }
          }}
          disabled={currentPage * itemsPerPage >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainView;
