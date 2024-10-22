import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RecyclingPopup from '../components/reciclaje_popup'; 

import basuraLibre from '../assets/basura_libre.png';
import basuraLlena from '../assets/basura_llena.png';

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
  const recyclePoints = [
    { id: 1, lat: -33.0441, lng: -71.6183, type: 'Llena', direccion: 'Calle San Martín 130' }, 
    { id: 2, lat: -33.0453, lng: -71.6310, type: 'Libre', direccion: 'Calle Errázuriz 1980' }, 
    { id: 3, lat: -33.0467, lng: -71.6295, type: 'Llena', direccion: 'Calle Del Parque 600' }, 
    { id: 4, lat: -33.0481, lng: -71.6125, type: 'Libre', direccion: 'Calle Condell 155' }, 
    { id: 5, lat: -33.0475, lng: -71.6195, type: 'Llena', direccion: 'Calle Lota 190' }, 
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Encuentre su punto de RECICLAJE</h2>
      <MapContainer
        center={[-33.0456, -71.6199]}
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
            icon={point.type === 'Libre' ? libreIcon : llenaIcon}
          >
            {/* Using component reciclaje_popup */}
            <RecyclingPopup type={point.type} direccion={point.direccion} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

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
