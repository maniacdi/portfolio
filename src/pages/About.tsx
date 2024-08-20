import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="about__container">
        <h1>{t('about')}</h1>
      </div>
    </div>
  );
};

export default About;
