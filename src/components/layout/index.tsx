// src/components/layout/DefaultLayout.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { Arrow } from '../icons';
import '../../assets/index.css'

const DefaultLayout: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const changeButtonCondition = useCallback(() => {
    setShowButton(window.scrollY > window.innerHeight);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', changeButtonCondition);
    return () => {
      window.removeEventListener('scroll', changeButtonCondition);
    };
  }, [changeButtonCondition]);

  return (
    <div className="layout">
      <Header />
      <Outlet />
      {showButton && (
        <div
          onClick={scrollToTop}
          style={{ boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)' }}
          className="fixed cursor-pointer shadow-xl rounded-full bottom-5 right-5"
        >
          <Arrow />
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
