import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../CharacterCard';
import { mockCharacter } from '../../../mocks/mockCharacter';
import useFavorites from '../../../hooks/useFavorites';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../hooks/useFavorites');

const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();
const mockFavorites = [
  {
    id: '1',
    description: 'This is a mock character',
    name: 'Spider-Man',
    thumbnail: {
      path: 'https://example.com/spider-man',
      extension: 'jpg',
    },
  },
];
describe('[COMPONENT] CharacterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });
  });

  test('renders CharacterCard with character details', () => {
    render(
      <Router>
        <CharacterCard character={mockCharacter} />
      </Router>
    );

    const nameElement = screen.getByText(/Spider-Man/i);

    expect(nameElement).toBeInTheDocument();
  });

  test('calls addFavorite when the heart icon is clicked and character is not in favorites', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(
      <Router>
        <CharacterCard character={mockCharacter} />
      </Router>
    );

    const favIcon = screen.getByAltText(/Favorite/i);

    fireEvent.click(favIcon);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  test('calls removeFavorite when the heart icon is clicked and character is in favorites', () => {
    render(
      <Router>
        <CharacterCard character={mockCharacter} />
      </Router>
    );

    const favIcon = screen.getByAltText(/Favorite/i);

    fireEvent.click(favIcon);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });
});
