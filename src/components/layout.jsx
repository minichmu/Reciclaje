import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home_page';
import TrabajadorPage from '../pages/trabajador_page.jsx';
import RecicladorPage from '../pages/reciclador_map.jsx';
import RecicladorConsejos from '../pages/reciclador_consejos.jsx';
import Navbar from '../components/navBar_reciclador.jsx'; 

const RecicladorLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<RecicladorPage />} /> {/* Chemin relatif pour la page du recyclador */}
        <Route path='/consejos' element={<RecicladorConsejos />} /> {/* Page de conseils */}
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/trabajador' element={<TrabajadorPage />} />
        <Route path='/reciclador/*' element={<RecicladorLayout />} /> {/* Route pour le layout du recyclador */}
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
