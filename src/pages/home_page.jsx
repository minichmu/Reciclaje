import React from 'react';
import { Link } from 'react-router-dom';

// Componente funcional que representa la página principal
export const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Título principal */}
      <h1 style={styles.text}>ESTOY :</h1>
      
      {/* Enlace al componente "trabajador" */}
      <Link to="/trabajador" style={styles.link}>
        <button style={styles.button}>TRABAJADOR</button>
      </Link>

      {/* Enlace al componente "reciclador" */}
      <Link to="/reciclador" style={styles.link}>
        <button style={styles.button}>RECICLADOR</button>
      </Link>
    </div>
  );
};

// Estilos en línea para los elementos de la página
const styles = {
  container: {
    display: 'flex', // Utiliza flexbox para alinear los elementos
    flexDirection: 'column', // Coloca los elementos en columna
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente
    height: '100vh', // Ocupa toda la altura de la pantalla
    backgroundColor: '#8DA691', // Color de fondo
  },
  text: {
    marginBottom: '20px', // Margen inferior para separar el texto de los botones
    fontSize: '24px', // Tamaño de la fuente
    fontWeight: 'bold', // Texto en negrita
    color: 'black', // Color del texto
  },
  button: {
    backgroundColor: 'white', // Color de fondo del botón
    color: 'black', // Color del texto del botón
    padding: '15px 30px', // Espaciado interno del botón
    margin: '10px 0', // Margen superior e inferior
    border: 'none', // Sin borde
    borderRadius: '20px', // Bordes redondeados
    fontSize: '18px', // Tamaño del texto en el botón
    cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra del botón
    width: '200px', // Ancho del botón
    textAlign: 'center', // Centra el texto dentro del botón
  },
  link: {
    textDecoration: 'none', // Elimina el subrayado de los enlaces
  }
};

export default HomePage;
