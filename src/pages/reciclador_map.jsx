import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RecyclingPopup from '../components/reciclaje_popup'; 
import Navbar from '../components/navBar_reciclador';
import { Link } from 'react-router-dom';
import basuraLibre from '../assets/basura_libre.png';
import basuraLlena from '../assets/basura_llena.png';

// Configuración de los íconos
const libreIcon = new L.Icon({
  iconUrl: basuraLibre,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [0, -40],
});

const llenaIcon = new L.Icon({
  iconUrl: basuraLlena,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [0, -40],
});

// Función para calcular la distancia entre dos puntos
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};

const RecicladorPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState('');
  const [closestPoint, setClosestPoint] = useState(null);
  const closestMarkerRef = useRef(null); // Referencia para el marcador más cercano

  const recyclePoints = [
    { id: 1, lat: -33.0441, lng: -71.6183, type: 'Llena', direccion: 'Calle San Martín 130' }, 
    { id: 2, lat: -33.0453, lng: -71.6310, type: 'Libre', direccion: 'Calle Errázuriz 1980' }, 
    { id: 3, lat: -33.0467, lng: -71.6295, type: 'Llena', direccion: 'Calle Del Parque 600' }, 
    { id: 4, lat: -33.0481, lng: -71.6125, type: 'Libre', direccion: 'Calle Condell 155' }, 
    { id: 5, lat: -33.0475, lng: -71.6195, type: 'Llena', direccion: 'Calle Lota 190' }, 
    { id: 6, lat: -33.0500, lng: -71.6200, type: 'Libre', direccion: 'Calle Colón 123' }, 
    { id: 7, lat: -33.0387, lng: -71.6041, type: 'Llena', direccion: 'Calle Blanco 450' }, 
    { id: 8, lat: -33.0375, lng: -71.603, type: 'Libre', direccion: 'Calle Bellavista 789' }, 
    { id: 9, lat: -33.0354, lng: -71.5560, type: 'Llena', direccion: 'Calle Cumming 1025' }, 
    { id: 10, lat: -33.0338, lng: -71.5115, type: 'Libre', direccion: 'Calle Esmeralda 520' }, 
    { id: 11, lat: -33.0247, lng: -71.5519, type: 'Llena', direccion: 'Calle 15 Norte 100' }, 
    { id: 12, lat: -33.0243, lng: -71.5480, type: 'Libre', direccion: 'Calle Libertad 200' }, 
    { id: 13, lat: -33.0222, lng: -71.5540, type: 'Llena', direccion: 'Calle 6 Norte 456' }, 
    { id: 14, lat: -33.0215, lng: -71.5429, type: 'Libre', direccion: 'Avenida Perú 305' }, 
    { id: 15, lat: -33.0257, lng: -71.5412, type: 'Llena', direccion: 'Calle Valparaíso 600' }, 
    { id: 16, lat: -33.0295, lng: -71.5350, type: 'Libre', direccion: 'Avenida Marina 765' }, 
    { id: 17, lat: -33.0328, lng: -71.5337, type: 'Llena', direccion: 'Calle 1 Poniente 234' }, 
    { id: 18, lat: -33.0284, lng: -71.5295, type: 'Libre', direccion: 'Calle 3 Poniente 870' }, 
    { id: 19, lat: -33.0471, lng: -71.6110, type: 'Llena', direccion: 'Calle Almirante Montt 109' }, 
    { id: 20, lat: -33.0542, lng: -71.562, type: 'Libre', direccion: 'Calle Serrano 302' }, 
    { id: 21, lat: -33.0305, lng: -71.6387, type: 'Llena', direccion: 'Calle Argentina 1235' }, 
    { id: 22, lat: -33.0512, lng: -71.6001, type: 'Libre', direccion: 'Calle Baquedano 157' }, 
    { id: 23, lat: -33.0345, lng: -71.5939, type: 'Llena', direccion: 'Calle Independencia 850' }, 
    { id: 24, lat: -33.0331, lng: -71.5824, type: 'Libre', direccion: 'Calle Playa Ancha 678' }, 
    { id: 25, lat: -33.0281, lng: -71.5220, type: 'Llena', direccion: 'Calle Francia 2300' }, 
  ];

  const FlyToLocation = ({ position }) => {
    const map = useMap();
    if (position) {
      map.flyTo(position, 15); // Zoom a la ubicación
    }
    return null;
  };

  const handleInputChange = (e) => {
    setInputLocation(e.target.value);
  };

  const findClosestLibreFromInput = async () => {
    try {
      let lat, lng;

      if (inputLocation.includes(',')) {
        const [inputLat, inputLng] = inputLocation.split(',').map(Number);
        if (!isNaN(inputLat) && !isNaN(inputLng)) {
          lat = inputLat;
          lng = inputLng;
        } else {
          alert("Coordenadas inválidas. Ejemplo: '-33.0456, -71.6199'");
          return;
        }
      } else {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json`);
        const data = await response.json();
        if (data.length === 0) {
          alert("Dirección no encontrada. Por favor, intente de nuevo.");
          return;
        }
        lat = parseFloat(data[0].lat);
        lng = parseFloat(data[0].lon);
      }

      setCurrentLocation([lat, lng]);

      // Filtrar solo las basuras "Libres"
      const libresPoints = recyclePoints.filter((point) => point.type === 'Libre');

      if (libresPoints.length === 0) {
        alert("No se encontraron basuras libres.");
        return;
      }

      const closestLibre = libresPoints.reduce((prev, current) => {
        const prevDistance = calculateDistance(lat, lng, prev.lat, prev.lng);
        const currentDistance = calculateDistance(lat, lng, current.lat, current.lng);
        return currentDistance < prevDistance ? current : prev;
      });

      setClosestPoint(closestLibre);
    } catch (error) {
      console.error("Error al buscar la ubicación: ", error);
      alert("Error al buscar la ubicación.");
    }
  };

  useEffect(() => {
    if (closestPoint && closestMarkerRef.current) {
      closestMarkerRef.current.openPopup(); // Abrir automáticamente el popup
    }
  }, [closestPoint]);

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.homeButton}>
        Volver al Inicio
      </Link>
      <h2 style={styles.title}>Encuentre su Punto de Reciclaje</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Ingrese dirección o coordenadas"
          value={inputLocation}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={findClosestLibreFromInput} style={styles.searchButton}>
          Buscar
        </button>
      </div>
      <MapContainer
        center={[-33.0456, -71.6199]}
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentLocation && <FlyToLocation position={currentLocation} />}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={new L.Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
              iconSize: [30, 30],
            })}
          />
        )}
        {recyclePoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={point.type === 'Libre' ? libreIcon : llenaIcon}
          >
            <RecyclingPopup type={point.type} direccion={point.direccion} />
          </Marker>
        ))}
        {closestPoint && (
          <Marker
            position={[closestPoint.lat, closestPoint.lng]}
            icon={new L.Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
              iconSize: [30, 30],
            })}
            ref={closestMarkerRef} // Adjunta la referencia
          >
            <Popup>
              <div>
                
                <p style={styles.nearestBin}>Aquí está la basura libre más cercana a tu ubicación.</p>
                <p>Dirección: {closestPoint.direccion}</p>
                
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <Navbar />
    </div>
  );
};

const styles = {
  nearestBin: {
    textAlign: 'center',
    color: 'green', 
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#8DA691',
  },
  title: {
    fontSize: '40px',
    margin: '10px',
    color: '#F5F5F5',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '300px',
  },
  searchButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#7a9c79',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  map: {
    height: '70%',
    width: '90%',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  homeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#F5F5F5',
    color: '#8DA691',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default RecicladorPage;
