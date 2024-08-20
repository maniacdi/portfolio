import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Mlogo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';

import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-container">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={() => navigate('/')}
        />
        <nav className="header__nav">
          {' '}
          <button
            className="btn header-btn"
            onClick={() => navigate('/playground')}
          >
            {t('play.title')}
          </button>
          <button className="btn header-btn" onClick={() => navigate('/about')}>
            MAGALDI
          </button>
          <button
            className="btn header-btn"
            onClick={() => navigate('/marvel-list')}
          >
            MARVEL
          </button>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
