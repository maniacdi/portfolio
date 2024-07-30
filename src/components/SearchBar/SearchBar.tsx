import React from 'react';

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
      type='text'
      onChange={handleChange}
      placeholder='Search characters...'
      disabled={disabled}
    />
  );
};

export default SearchBar;
