import React from 'react';
import './Header.scss';
import favLogo from '../../assets/red-heart.png';
interface HeaderProps {
  logo: string;
  onFavoritesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ logo, onFavoritesClick }) => {
  return (
    <header className='header'>
      <img src={logo} alt='Logo' className='header-logo' />
      <button className='header-favorites' onClick={onFavoritesClick}>
        <img src={favLogo} alt='Favorites' className='fav-logo' />
      </button>
    </header>
  );
};

export default Header;
