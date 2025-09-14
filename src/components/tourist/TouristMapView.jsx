import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';

const TouristMapView = ({ tourist, zones }) => {
    
  useEffect(() => {
    // Simulate a geo-fence alert
    const checkGeoFence = () => {
      zones.forEach(zone => {
        const dist = Math.sqrt(
          Math.pow(tourist.currentLocation.lat - zone.center.lat, 2) +
          Math.pow(tourist.currentLocation.lng - zone.center.lng, 2)
        );
        // A very rough distance check, not accurate for real-world coords
        if (dist * 111320 < zone.radius) { // Approx conversion
            alert(`⚠️ Geo-fence Alert! ⚠️\nYou have entered a high-risk area: ${zone.name}. Please be cautious.`);
        }
      });
    };
    checkGeoFence();
  }, [tourist.currentLocation, zones]);

  return (
    <MapContainer center={[tourist.currentLocation.lat, tourist.currentLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[tourist.currentLocation.lat, tourist.currentLocation.lng]}>
        <Popup>You are here: {tourist.name}</Popup>
      </Marker>
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
    </MapContainer>
  );
};

export default TouristMapView;