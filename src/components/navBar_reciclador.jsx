import React from 'react';
import { Link } from 'react-router-dom';

// Componente Navbar
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/reciclador" style={styles.navButton}>
        Mapa
      </Link>
      <Link to="/reciclador/consejos" style={styles.navButton}>
        Consejos
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'fixed',  // Fijar la barra en la parte inferior
    bottom: 0,
    width: '100%',
    backgroundColor: '#8DA691',  // Color verde para representar la naturaleza
    padding: '10px 0',
    zIndex: 1000,  // Asegurarse que esté por encima de otros elementos
  },
  navButton: {
    backgroundColor: '#8DA691',
    color: '#F5F5F5',
    textDecoration: 'none',
    padding: '10px 20px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '60px',  
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;
