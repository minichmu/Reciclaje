import React from 'react';
import Modal from 'react-modal';

const ConsejosPopup = ({ title, description, onClose }) => {
  return (
    <Modal 
      isOpen={true} 
      onRequestClose={onClose} 
      style={customStyles} 
      contentLabel="Consejo Detalles"
      ariaHideApp={false} // Pour éviter l'erreur d'accessibilité
    >
      <h3 style={styles.popupTitle}>{title}</h3>
      <p>{description}</p>
      <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
    </Modal>
  );
};

// Styles pour le modal et le contenu
const styles = {
  popupTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#8DA691',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Styles personnalisés pour le modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default ConsejosPopup;
