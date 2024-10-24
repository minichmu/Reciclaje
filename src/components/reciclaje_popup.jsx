import React from 'react';
import { Popup } from 'react-leaflet';

const RecyclingPopup = ({ type, direccion }) => {
  const textColor = type === 'Libre' ? 'green' : 'red';

  return (
    <Popup>
      <div style={{ ...styles.popupContent}}>
        <h3 style={{...styles.popupTitle, color: textColor}}>{type}</h3>
        <p>Dirección: {direccion}</p>
      </div>
    </Popup>
  );
};

// Styles 
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
};

export default RecyclingPopup;
