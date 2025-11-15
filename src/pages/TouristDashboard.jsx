// src/pages/TouristDashboard.jsx
import React, { useState, useEffect } from 'react';
import { singleTourist, highRiskZones } from '../data/mockData';

// Main Components
import DigitalIDCard from '../components/tourist/DigitalIDCard';
import TouristMapView from '../components/tourist/TouristMapView';
import PanicButton from '../components/tourist/PanicButton';
import LocationTracker from '../components/tourist/LocationTracker';
import SmartBandSim from '../components/tourist/SmartBandSim';
import NearbyFamousPlaces from '../components/tourist/NearbyFamousPlaces';
import SafetyScore from '../components/tourist/SafetyScore';
import WeatherAdvisory from '../components/tourist/WeatherAdvisory';

// Feature Components
import Accordion from '../components/common/Accordion';
import AiPlanner from '../components/tourist/AiPlanner';
import EmergencyNetwork from '../components/tourist/EmergencyNetwork';
import CulturalGuide from '../components/tourist/CulturalGuide';
import TravelJournal from '../components/tourist/TravelJournal';

const TouristDashboard = () => {
  const [liveLocation, setLiveLocation] = useState(singleTourist.currentLocation);
  const [dynamicTourist, setDynamicTourist] = useState(singleTourist);
  
  // --- STATE FOR PANIC BUTTON (was missing) ---
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(10);
  
  // State for map focus
  const [mapFocusTrigger, setMapFocusTrigger] = useState(null);

  // --- HANDLER FUNCTIONS ---
  const handleLocationUpdate = (newCoords) => {
    setLiveLocation(newCoords);
    setDynamicTourist(prevTourist => ({
      ...prevTourist,
      currentLocation: newCoords
    }));
    setMapFocusTrigger(newCoords);
  };

  // === THIS IS THE MISSING FUNCTION THAT FIXES THE BUTTON ===
  const handlePanic = () => {
    if (isRecording) return; // Prevent multiple clicks while recording

    // 1. Send the alert
    alert(`PANIC SIGNAL SENT!\nYour LIVE Location: ${liveLocation.lat}, ${liveLocation.lng}\nAuthorities have been notified.`);
    
    // 2. Start the recording simulation
    setIsRecording(true);
    setCountdown(10); // Reset countdown
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // 3. End the recording simulation after 10 seconds
    setTimeout(() => {
      clearInterval(countdownInterval);
      setIsRecording(false);
      alert("Audio evidence recording complete and saved securely.");
    }, 10000);
  };
  // ==========================================================

  // useEffect for location ping (remains the same)
  useEffect(() => {
    const interval = setInterval(() => {
      const requestId = localStorage.getItem('locationRequest');
      if (requestId === singleTourist.id) {
        const hasConsented = window.confirm("EMERGENCY ALERT:\nAuthorities are requesting your live location. Do you consent to share it?");
        if (hasConsented) {
          navigator.geolocation.getCurrentPosition((position) => {
            handleLocationUpdate({ lat: position.coords.latitude, lng: position.coords.longitude });
            alert("Your location has been securely shared.");
          });
        } else {
          alert("You have denied the location sharing request.");
        }
        localStorage.removeItem('locationRequest');
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="tourist-dashboard">
      <div className="left-panel">
        <DigitalIDCard tourist={dynamicTourist} />
        <Accordion title="AI Itinerary Planner"><AiPlanner /></Accordion>
        <Accordion title="Travel Journal"><TravelJournal /></Accordion>
        <Accordion title="Cultural Guide"><CulturalGuide /></Accordion>
        <Accordion title="Emergency Network"><EmergencyNetwork /></Accordion>
        <SafetyScore score={dynamicTourist.safetyScore} />
        <WeatherAdvisory location={liveLocation} />
        <SmartBandSim tourist={dynamicTourist} />
        <LocationTracker onLocationUpdate={handleLocationUpdate} />
        <NearbyFamousPlaces location={liveLocation} />

        {/* This component now receives the correct function and state */}
        <PanicButton 
          onPanic={handlePanic} 
          isRecording={isRecording} 
          countdown={countdown} 
        />
      </div>
      <div className="right-panel">
        <TouristMapView 
          tourist={dynamicTourist} 
          zones={highRiskZones} 
          focusTrigger={mapFocusTrigger}
        />
      </div>
    </div>
  );
};

export default TouristDashboard;