import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  // const { loading, setLoading } = context;
  // const { id } = useParams<{ id: string }>();
  // const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home__container">
        <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
      </div>
    </div>
  );
};

export default Home;
