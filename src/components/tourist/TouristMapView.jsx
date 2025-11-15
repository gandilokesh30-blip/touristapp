// src/components/tourist/TouristMapView.jsx
import React, { useEffect } from 'react';
// Import the useMap hook from react-leaflet
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';

// --- NEW HELPER COMPONENT ---
// This component will live inside the map and have access to the map instance.
const MapController = ({ focusTrigger }) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    // This effect runs whenever the focusTrigger prop changes
    if (focusTrigger) {
      console.log("Map focus triggered! Flying to:", focusTrigger);
      // The flyTo method provides a smooth, animated transition
      map.flyTo([focusTrigger.lat, focusTrigger.lng], 15); // Zoom level 15 is good for cities
    }
  }, [focusTrigger, map]); // Dependency array

  return null; // This component does not render any visible elements
};
// ----------------------------

const TouristMapView = ({ tourist, zones, focusTrigger }) => {
  // useEffect for the geo-fence alert (remains the same)
  useEffect(() => {
    const checkGeoFence = () => {
      zones.forEach(zone => {
        const dist = Math.sqrt(Math.pow(tourist.currentLocation.lat - zone.center.lat, 2) + Math.pow(tourist.currentLocation.lng - zone.center.lng, 2));
        if (dist * 111320 < zone.radius) {
            // alert(`⚠️ Geo-fence Alert! ⚠️\nYou have entered a high-risk area: ${zone.name}. Please be cautious.`);
        }
      });
    };
    checkGeoFence();
  }, [tourist.currentLocation, zones]);

  return (
    <MapContainer 
      center={[tourist.currentLocation.lat, tourist.currentLocation.lng]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
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
      
      {/* --- ADD THE NEW MAP CONTROLLER HERE --- */}
      {/* It will listen for the trigger and control the map */}
      <MapController focusTrigger={focusTrigger} />

    </MapContainer>
  );
};

export default TouristMapView;