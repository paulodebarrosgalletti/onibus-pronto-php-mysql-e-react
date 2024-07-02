// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurar o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const Map = () => {
  const navigate = useNavigate();

  const firstLocation = [-23.535805209480777, -46.793396576099454]; 
  const secondLocation = [-23.53507687267742, -46.79188572365098]; 

  return (
    <MapContainer center={firstLocation} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
        subdomains={['mt0','mt1','mt2','mt3']}
      />
      <Marker position={firstLocation}>
        <Popup>
          Avenida Crisântemo, 303
          <button onClick={() => navigate('/bus-list?location=first')} style={{ display: 'block', marginTop: '10px', backgroundColor: '#137585', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer' }}>
            Ver Ônibus Disponíveis
          </button>
        </Popup>
      </Marker>
      <Marker position={secondLocation}>
        <Popup>
          Av. das Flores -  Osasco 
          <button onClick={() => navigate('/bus-list?location=second')} style={{ display: 'block', marginTop: '10px', backgroundColor: '#137585', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer' }}>
            Ver Ônibus Disponíveis
          </button>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
