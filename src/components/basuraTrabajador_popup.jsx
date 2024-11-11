import React from 'react';
import { Popup } from 'react-leaflet';

const RecyclingPopup = ({ type, direccion, onClear }) => {
  const textColor = type === 'Libre' ? 'green' : 'red';

  return (
    <Popup>
      <div style={{ ...styles.popupContent }}>
        <h3 style={{ ...styles.popupTitle, color: textColor }}>{type}</h3>
        <p>Dirección: {direccion}</p>
        <button style={styles.clearButton} onClick={onClear}>
          Basura recogida
        </button>
      </div>
    </Popup>
  );
};

// Estilos
const styles = {
  popupContent: {
    minWidth: '150px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  popupTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#8DA691',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default RecyclingPopup;
