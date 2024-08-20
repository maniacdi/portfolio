import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/Mlogo.svg';
import { useTranslation } from 'react-i18next';

import './Footer.scss';

const Footer = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <h1>
          {t('createdBy')} <span>MAGALDI</span>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
