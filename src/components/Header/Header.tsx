import React from 'react';
import './Header.scss';

interface HeaderProps {
  logo: string;
  onFavoritesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ logo, onFavoritesClick }) => {
  return (
    <header className='header'>
      <img src={logo} alt='Logo' className='header-logo' />
      <button className='header-favorites' onClick={onFavoritesClick}>
        <i className='fas fa-heart'></i>
      </button>
    </header>
  );
};

export default Header;
