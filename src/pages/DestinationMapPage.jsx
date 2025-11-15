// src/pages/DestinationMapPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { destinations, singleTourist } from '../data/mockData';
import { FaArrowLeft } from 'react-icons/fa';

// Helper component to automatically adjust map bounds
const MapBounds = ({ bounds }) => {
  const map = useMap();
  if (bounds.length > 0) {
    map.fitBounds(bounds);
  }
  return null;
};

const DestinationMapPage = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === parseInt(destinationId));

  if (!destination) {
    return (
      <div className="map-page-container">
        <h2>Destination not found</h2>
        <button onClick={() => navigate('/explore')} className="back-button">
          <FaArrowLeft /> Back to Explore
        </button>
      </div>
    );
  }

  const touristPosition = [singleTourist.currentLocation.lat, singleTourist.currentLocation.lng];
  const destinationPosition = [destination.coords.lat, destination.coords.lng];
  const routeLine = [touristPosition, destinationPosition];
  const bounds = [touristPosition, destinationPosition];

  return (
    <div className="map-page-container">
      <div className="map-header">
        <button onClick={() => navigate('/explore')} className="back-button">
          <FaArrowLeft /> Back to Explore
        </button>
        <h1>Route to {destination.name}</h1>
        <p>{destination.location}</p>
      </div>
      <div className="map-wrapper">
        <MapContainer center={destinationPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={touristPosition}>
            <Popup>Your Current Location</Popup>
          </Marker>
          <Marker position={destinationPosition}>
            <Popup>{destination.name}</Popup>
          </Marker>
          <Polyline pathOptions={{ color: 'blue' }} positions={routeLine} />
          <MapBounds bounds={bounds} />
        </MapContainer>
      </div>
      <p className="route-disclaimer">
        Note: This is a simulated straight-line route for demonstration purposes. A real application would use a routing service like OSRM or Mapbox for turn-by-turn directions.
      </p>
    </div>
  );
};

export default DestinationMapPage;