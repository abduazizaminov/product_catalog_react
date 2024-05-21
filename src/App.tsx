// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/layout/index';
import MainPage from './pages/main-page';
import BasketPage from './pages/basket-page';
import InfoPage from './pages/info-page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="info/:id" element={<InfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
