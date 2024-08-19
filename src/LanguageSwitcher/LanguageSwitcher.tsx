import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="languge-switcher">
      <button className="language-flag" onClick={() => changeLanguage('en')}>
        <span className="fi fi-gb"></span>
      </button>
      <button className="language-flag" onClick={() => changeLanguage('es')}>
        <span className="fi fi-es"></span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
