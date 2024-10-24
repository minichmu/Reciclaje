import React, { useState } from 'react';
import Navbar from '../components/navBar_reciclador';
import ConsejosPopup from '../components/consejos_popup';
import { Link } from 'react-router-dom';

const RecicladorConsejos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const consejos = [
    {
      id: 1,
      title: '5 Consejos para Separar Correctamente los Residuos',
      description: `Separar los residuos es fundamental para facilitar el proceso de reciclaje. 
      Comienza por designar un área específica en tu hogar para los residuos reciclables. 
      Utiliza diferentes contenedores para papel, plástico, vidrio y residuos orgánicos. 
      Asegúrate de que los envases estén limpios y secos antes de depositarlos en el contenedor correspondiente. 
      Además, informa a todos los miembros de tu familia sobre la importancia de esta práctica. 
      Recuerda que una separación adecuada puede aumentar la eficiencia del reciclaje y contribuir a un planeta más limpio.`,
    },
    {
      id: 2,
      title: '¿Qué Materiales Son Reciclables?',
      description: `No todos los materiales pueden ser reciclados. 
      Generalmente, los materiales reciclables incluyen papel, cartón, plástico (con los números 1 y 2), 
      vidrio y metales. Es importante verificar las indicaciones locales sobre reciclaje, 
      ya que las normativas pueden variar según la región. 
      Por ejemplo, algunos plásticos, como los que contienen poliestireno, 
      no son aceptados en muchos centros de reciclaje. 
      Informa a tus amigos y familiares sobre los materiales que se pueden reciclar 
      para aumentar la tasa de reciclaje en tu comunidad.`,
    },
    {
      id: 3,
      title: 'Reducir, Reutilizar y Reciclar: La Guía Completa',
      description: `El mantra "reducir, reutilizar y reciclar" es una estrategia clave para 
      minimizar el desperdicio. Comienza por reducir la cantidad de productos que consumes. 
      Pregúntate si realmente necesitas comprar un nuevo artículo antes de hacerlo. 
      La reutilización implica encontrar nuevas maneras de utilizar objetos que de otro modo 
      serían desechados. Por ejemplo, los frascos de vidrio pueden convertirse en 
      recipientes de almacenamiento. Finalmente, el reciclaje es la última opción; 
      asegúrate de que los materiales sean reciclables y de seguir las pautas de reciclaje en tu área.`,
    },
    {
      id: 4,
      title: 'El Compostaje en Casa',
      description: `El compostaje es una excelente manera de gestionar los residuos orgánicos 
      y devolver nutrientes al suelo. Puedes comenzar a compostar en casa utilizando 
      restos de frutas y verduras, cáscaras de huevo, posos de café y hojas secas. 
      Asegúrate de evitar agregar carne, productos lácteos y aceites, ya que pueden atraer plagas. 
      Existen varias formas de compostar, desde pilas abiertas hasta sistemas de compostaje 
      en recipientes cerrados. El compost resultante es un excelente fertilizante 
      natural para tus plantas y jardines, ayudando a mejorar la salud del suelo.`,
    },
    {
      id: 5,
      title: 'Errores Comunes al Reciclar y Cómo Evitarlos',
      description: `A pesar de la buena intención, muchas personas cometen errores al reciclar. 
      Un error común es no limpiar adecuadamente los envases antes de reciclarlos; 
      los residuos de alimentos pueden contaminar otros materiales reciclables. 
      Otro error es confundir los diferentes tipos de plásticos, lo que puede llevar 
      a la mezcla de materiales no reciclables. 
      Además, a menudo se incluyen artículos que no son reciclables en los contenedores. 
      Infórmate sobre las reglas locales y verifica qué se acepta en tu área. 
      Un reciclaje efectivo no solo reduce la cantidad de residuos que terminan en los vertederos, 
      sino que también ayuda a conservar recursos naturales y a reducir la contaminación.`,
    },
  ];

  const [selectedConsejo, setSelectedConsejo] = useState(null);

  const handleLeerMasClick = (consejo) => {
    setSelectedConsejo(consejo);
  };

  const handleClosePopup = () => {
    setSelectedConsejo(null);
  };

  const filteredConsejos = consejos.filter(consejo => 
    consejo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consejo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
        {/* Bouton Home */}
      <Link to="/" style={styles.homeButton}>
        Volver Home
      </Link>
      <Navbar />
      <h2 style={styles.title}>Consejos para un Reciclaje Eficiente</h2>
      <input 
        type="text" 
        placeholder="Buscar consejos..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={styles.searchInput}
      />
      <div style={styles.consejosList}>
        {filteredConsejos.map((consejo) => (
          <div key={consejo.id} style={styles.consejoCard}>
            <h3 style={styles.consejoTitle}>{consejo.title}</h3>
            <p style={styles.consejoDescription}>{consejo.description}</p>
            <button 
              style={styles.consejoLink} 
              onClick={() => handleLeerMasClick(consejo)}
            >
              Leer más
            </button>
          </div>
        ))}
      </div>

      {/* Popup para mostrar los consejos */}
      {selectedConsejo && (
        <ConsejosPopup 
          title={selectedConsejo.title} 
          description={selectedConsejo.description} 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#8DA691',
    marginBottom: '20px',
  },
  searchInput: {
    width: '80%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    '&:focus': {
      borderColor: '#8DA691',
    },
  },
  consejosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '80%',
    paddingBottom: '100px', 
  },
  consejoCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  consejoTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  consejoDescription: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2, // Limitar a 2 líneas
    fontSize: '14px',
    marginBottom: '10px',
    color: '#666',
  },
  consejoLink: {
    fontSize: '14px',
    color: '#8DA691',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  homeButton: {
    position: 'absolute', // Positionnement absolu
    top: '20px', // Distance du haut
    right: '20px', // Distance de la droite
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#8DA691',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  homeButtonHover: {
    backgroundColor: '#7a9c79',
  }
};

export default RecicladorConsejos;
