// src/components/dashboard/DashboardMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// This fix for the default icon is still needed for other map elements.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Function to create custom SVG map pin icons
const getTouristIcon = (status) => {
  // === THE FIX IS HERE: Use exact color codes as requested ===
  let pinColor;
  switch (status) {
    case 'Alert':
      pinColor = '#ffc107'; // Orange (from your CSS --warning-color)
      break;
    case 'Missing':
      pinColor = '#dc3545'; // Red (from your CSS --danger-color)
      break;
    case 'Safe':
    default:
      pinColor = '#28a745'; // Green (from your CSS --success-color)
  }
  // ==========================================================

  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <path fill="${pinColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13C19 5.13 15.87 2 12 2z"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `;

  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconSvg)}`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const MapFocus = ({ position }) => {
    const map = useMap();
    if(position) {
        map.flyTo([position.lat, position.lng], 15);
    }
    return null;
}

const DashboardMap = ({ tourists, zones, selectedTourist }) => {
  const center = [26.0, 91.9];

  return (
    <div className="dashboard-map-container">
      <MapContainer center={center} zoom={9} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tourists.map(t => (
          <Marker 
            key={t.id} 
            position={[t.currentLocation.lat, t.currentLocation.lng]}
            icon={getTouristIcon(t.status)}
          >
            <Popup>
              <b>{t.name}</b><br/>Status: {t.status}<br/>Score: {t.score}
            </Popup>
          </Marker>
        ))}
        {zones.map(zone => (
          <Circle
            key={zone.name}
            center={[zone.center.lat, zone.center.lng]}
            pathOptions={{ color: 'red', fillColor: 'red' }}
            radius={zone.radius}
          >
            <Popup>{zone.name} (High-Risk Zone)</Popup>
          </Circle>
        ))}
        <MapFocus position={selectedTourist?.currentLocation} />
      </MapContainer>
    </div>
  );
};

export default DashboardMap;