import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { MarvelContext, MarvelProvider } from './context/MarvelContext';
import MarvelHeader from './components/MarvelHeader/MarvelHeader';
import Loader from './components/Loader/Loader';
import MarvelList from './pages/MarvelList';
import CharacterDetail from './pages/CharacterDetail';
import logo from './assets/logo.svg';
import './App.scss';
import Home from './pages/Home';
import Header from './components/Header/Header';
import About from './pages/About';
import Playground from './pages/Playground';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  return (
    <MarvelProvider>
      <Router>
        <div className="app">
          <Header />

          <AppContent
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
          <Footer />
        </div>
      </Router>
    </MarvelProvider>
  );
};

const AppContent: React.FC<{
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showFavorites, setShowFavorites }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useContext(MarvelContext);
  const handleFavoritesClick = () => {
    if (location.pathname.includes('/character')) {
      navigate('/marvel-list');
      setShowFavorites(true);
    } else {
      navigate('/marvel-list');
      setShowFavorites((prevShowFavorites) => !prevShowFavorites);
    }
  };

  const handleLogoClick = () => {
    navigate('/marvel-list');
    setShowFavorites(false);
  };
  const showMarvelHeader =
    location.pathname === '/marvel-list' ||
    location.pathname.includes('/character');

  return (
    <div className="app-content">
      {showMarvelHeader && (
        <MarvelHeader
          logo={logo}
          onFavoritesClick={handleFavoritesClick}
          onLogoClick={handleLogoClick}
        />
      )}
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/marvel-list"
          element={<MarvelList showFavorites={showFavorites} />}
        />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
};

export default App;
