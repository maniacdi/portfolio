import React from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled: boolean;
  itemCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  disabled,
  itemCount,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className='search-bar'>
      <input
        className='search-bar__input'
        type='text'
        onChange={handleChange}
        placeholder='SEARCH A CHARACTER...'
        disabled={disabled}
      />
      <div className='search-bar__count'>
        {itemCount} {itemCount === 1 ? 'Result' : 'Results'}
      </div>
    </div>
  );
};

export default SearchBar;
