import React from 'react';
import { MarvelProvider } from './context/MarvelContext';
import MainView from './pages/MainView';

const App: React.FC = () => {
  return (
    <MarvelProvider>
      <MainView />
    </MarvelProvider>
  );
};

export default App;
