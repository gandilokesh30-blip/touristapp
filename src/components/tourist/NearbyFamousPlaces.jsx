// src/components/tourist/NearbyFamousPlaces.jsx
import React, { useState, useEffect } from 'react';
import { FaRoute } from 'react-icons/fa';
// Import the destinations directly from your mock data
import { destinations } from '../../data/mockData';

// --- Helper Function to Calculate Distance (in kilometers) ---
const calculateDistance = (point1, point2) => {
  if (!point1 || !point2) return null;
  const R = 6371; // Radius of the Earth in km
  const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
  const dLon = (point2.lng - point1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * (Math.PI / 180)) * Math.cos(point2.lat * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(1); // e.g., "4.2"
};

const NearbyFamousPlaces = ({ location }) => {
  const [sortedPlaces, setSortedPlaces] = useState([]);

  // This effect runs whenever the user's live location changes
  useEffect(() => {
    if (location) {
      // 1. Calculate the distance to each of the 6 fixed destinations
      const placesWithDistance = destinations.map(dest => ({
        ...dest,
        distance: calculateDistance({ lat: location.lat, lng: location.lng }, dest.coords)
      }));

      // 2. Sort the destinations by the newly calculated distance
      const sorted = placesWithDistance.sort((a, b) => a.distance - b.distance);
      
      setSortedPlaces(sorted);
    }
  }, [location]); // Re-calculate and re-sort whenever the location updates

  return (
    <div className="nearby-places-card">
      <h4>Nearest Famous Destinations</h4>
      
      <div className="places-list">
        {sortedPlaces.length > 0 ? (
          sortedPlaces.map(place => (
            // The link now correctly points to the map page for this destination
            <a href={`/small-tourist-app/explore/${place.id}`} key={place.id} className="place-item-link">
              <div className="place-item">
                <img src={place.imageUrl} alt={place.name} className="place-photo" />
                <div className="place-details">
                  <h5>{place.name}</h5>
                  <div className="place-distance">
                    <FaRoute />
                    <span>{place.distance} km away</span>
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p>Click "Get My Current Location" to see distances to famous places.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyFamousPlaces;