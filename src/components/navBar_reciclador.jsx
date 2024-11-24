import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Composant Navbar
const Navbar = () => {
  // Créer un état pour chaque bouton
  const [hoveredMap, setHoveredMap] = useState(false);
  const [hoveredConsejos, setHoveredConsejos] = useState(false);

  return (
    <nav style={styles.navbar}>
      <Link
        to="/reciclador"
        style={hoveredMap ? { ...styles.navButton, ...styles.navButtonHover } : styles.navButton}
        onMouseEnter={() => setHoveredMap(true)}
        onMouseLeave={() => setHoveredMap(false)}
      >
        Mapa
      </Link>
      <Link
        to="/reciclador/consejos"
        style={hoveredConsejos ? { ...styles.navButton, ...styles.navButtonHover } : styles.navButton}
        onMouseEnter={() => setHoveredConsejos(true)}
        onMouseLeave={() => setHoveredConsejos(false)}
      >
        Consejos
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#8DA691',
    padding: '10px 0',
    zIndex: 1000,
  },
  navButton: {
    backgroundColor: '#8DA691',
    color: '#F5F5F5',
    textDecoration: 'none',
    padding: '15px 30px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '30px',
    border: '2px solid #FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  navButtonHover: {
    backgroundColor: '#FFFFFF',
    color: '#8DA691',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    borderColor: '#8DA691',
  },
};

export default Navbar;
