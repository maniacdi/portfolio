import React, { useContext } from 'react';
import { MarvelContext } from '../../context/MarvelContext';
import redHeartSvg from '../../assets/red-heart.svg';
import './Header.scss';

interface HeaderProps {
  logo: string;
  onFavoritesClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  onFavoritesClick,
  onLogoClick,
}) => {
  const { favorites } = useContext(MarvelContext);
  return (
    <header className="header">
      <div className="header-container">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={onLogoClick}
        />
        <button className="header-favorites" onClick={onFavoritesClick}>
          <img
            src={redHeartSvg}
            alt="Favorites"
            className="header-favorites__logo"
          />
          <span className="header-favorites__count">{favorites.length}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
