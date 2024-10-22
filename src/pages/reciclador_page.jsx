import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import basuraLibre from '../assets/basura_libre.png';
import basuraLlena from '../assets/basura_llena.png';

// Icónicas personalizadas para los puntos de reciclaje
const libreIcon = new L.Icon({
  iconUrl: basuraLibre,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [0, -40]
});

const llenaIcon = new L.Icon({
  iconUrl: basuraLlena,
  iconSize: [25, 25], 
  iconAnchor: [13, 13], 
  popupAnchor: [0, -40]
});

const RecicladorPage = () => {
  // Puntos de reciclaje con sus coordenadas y tipos
  const recyclePoints = [
    { id: 1, lat: -33.0456, lng: -71.6199, type: 'Libre' },
    { id: 2, lat: -33.0472, lng: -71.6128, type: 'Llena' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Encuentre su punto de RECICLAJE</h2>
      <MapContainer
        center={[-33.0456, -71.6199]} // Centro del mapa
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {recyclePoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={point.type === 'Libre' ? libreIcon : llenaIcon} // Icono según el tipo
          >
            <Popup>
              Punto de reciclaje {point.type} // Mensaje en el popup
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Estilos para la disposición
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#8DA691',
  },
  title: {
    fontSize: '20px',
    margin: '10px',
    color: 'black',
  },
  map: {
    height: '80%',
    width: '90%',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
};

export default RecicladorPage;
