import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        onChange={handleChange}
        placeholder={t('character.search')}
        disabled={disabled}
      />
      <div className="search-bar__count">
        {itemCount} {itemCount === 1 ? t('result') : t('results')}
      </div>
    </div>
  );
};

export default SearchBar;
