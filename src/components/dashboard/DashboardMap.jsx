import React from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const getStatusIcon = (status) => {
    const color = status === 'Safe' ? 'green' : status === 'Alert' ? 'orange' : 'red';
    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
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
  const center = [26.0, 91.9]; // Center of Northeast India approx

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
            icon={getStatusIcon(t.status)}
          >
            <Popup>
              <b>{t.name}</b><br/>Status: {t.status}<br/>Score: {t.safetyScore}
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