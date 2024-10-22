import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home_page';
import TrabajadorPage from '../pages/trabajador_page.jsx';
import RecicladorPage from '../pages/reciclador_page.jsx';

const Layout = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/trabajador' element={<TrabajadorPage />} />
            <Route path='/reciclador' element={<RecicladorPage />} />
          </Routes>
    </BrowserRouter>
  );
};

export default Layout;
