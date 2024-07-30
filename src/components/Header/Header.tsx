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
      <i className='test fa-duotone fa-solid fa-user'></i>
      <button className='header-favorites' onClick={onFavoritesClick}>
        <i className='fa-duotone fa-solid fa-user'></i>
      </button>
    </header>
  );
};

export default Header;
