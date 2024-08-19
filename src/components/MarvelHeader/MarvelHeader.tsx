import React, { useContext } from 'react';
import { MarvelContext } from '../../context/MarvelContext';
import redHeartSvg from '../../assets/red-heart.svg';
import './MarvelHeader.scss';

interface MarvelHeaderProps {
  logo: string;
  onFavoritesClick: () => void;
  onLogoClick: () => void;
}

const MarvelHeader: React.FC<MarvelHeaderProps> = ({
  logo,
  onFavoritesClick,
  onLogoClick,
}) => {
  const { favorites } = useContext(MarvelContext);
  return (
    <header className="marvel-header">
      <div className="marvel-header-container">
        <img
          src={logo}
          alt="Logo"
          className="marvel-header-logo"
          onClick={onLogoClick}
        />
        <button className="marvel-header-favorites" onClick={onFavoritesClick}>
          <img
            src={redHeartSvg}
            alt="Favorites"
            className="marvel-header-favorites__logo"
          />
          <span className="marvel-header-favorites__count">
            {favorites.length}
          </span>
        </button>
      </div>
    </header>
  );
};

export default MarvelHeader;
