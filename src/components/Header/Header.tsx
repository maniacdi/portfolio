import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';
import './Header.scss';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={() => navigate('/')}
        />
        <button
          className="btn header-btn"
          onClick={() => navigate('/marvel-list')}
        >
          LISTA
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
