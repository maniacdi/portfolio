import React from 'react';
import { useTranslation } from 'react-i18next';

const Playground: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="playground">
      <div className="playground__container">
        <h1>{t('play.title')}</h1>
      </div>
    </div>
  );
};

export default Playground;
