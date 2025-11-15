// src/components/tourist/LocationTracker.jsx
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSpinner, FaTimesCircle } from 'react-icons/fa';

const LocationTracker = ({ onLocationUpdate }) => {
  const [status, setStatus] = useState('Click the button to find your location.');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setStatus('Requesting your location...');

    // Geolocation API call
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        setStatus('Location found successfully!');
        const { latitude, longitude } = position.coords;
        // Pass the new location up to the parent component
        onLocationUpdate({ lat: latitude, lng: longitude });
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setStatus('You denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            setStatus('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setStatus('The request to get user location timed out.');
            break;
          default:
            setStatus('An unknown error occurred.');
            break;
        }
      }
    );
  };

  return (
    <div className="location-card">
      <h4>Live Location Tracker</h4>
      <button onClick={handleGetLocation} disabled={isLoading} className="location-button">
        <FaMapMarkerAlt /> {isLoading ? 'Locating...' : 'Get My Current Location'}
      </button>
      <div className="location-status">
        {isLoading ? <FaSpinner className="spinner" /> : (status.includes('denied') || status.includes('error')) && <FaTimesCircle style={{ color: 'var(--danger-color)' }} />}
        <p>{status}</p>
      </div>
    </div>
  );
};

export default LocationTracker;