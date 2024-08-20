import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home__container">
        <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
      </div>
      <div className="home__footer">
        <h1>{t('maintenance')}</h1>
      </div>
    </div>
  );
};

export default Home;
