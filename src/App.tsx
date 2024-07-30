import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { MarvelContext, MarvelProvider } from './context/MarvelContext';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import MainView from './pages/MainView';
import CharacterDetail from './pages/CharacterDetail';
import logo from './assets/logo.png';
import './App.scss';

const App: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  return (
    <MarvelProvider>
      <Router>
        <AppContent
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
      </Router>
    </MarvelProvider>
  );
};

const AppContent: React.FC<{
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showFavorites, setShowFavorites }) => {
  const navigate = useNavigate();
  const { loading } = useContext(MarvelContext);
  const handleFavoritesClick = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  const handleLogoClick = () => {
    navigate('/');
    setShowFavorites(false);
  };

  return (
    <>
      <Header
        logo={logo}
        onFavoritesClick={handleFavoritesClick}
        onLogoClick={handleLogoClick}
      />
      {loading && <Loader />}
      <Routes>
        <Route path='/' element={<MainView showFavorites={showFavorites} />} />
        <Route path='/character/:id' element={<CharacterDetail />} />
      </Routes>
    </>
  );
};

export default App;
