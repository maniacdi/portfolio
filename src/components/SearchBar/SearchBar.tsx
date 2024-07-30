import React from 'react';
import './SearchBar.scss';
interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className='search-bar'
      type='text'
      onChange={handleChange}
      placeholder='Search characters...'
      disabled={disabled}
    />
  );
};

export default SearchBar;
