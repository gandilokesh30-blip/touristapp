// src/pages/TouristDashboard.jsx
import React from 'react';
import { singleTourist, highRiskZones } from '../data/mockData';
import DigitalIDCard from '../components/tourist/DigitalIDCard';
import SafetyScore from '../components/tourist/SafetyScore';
import PanicButton from '../components/tourist/PanicButton';
import TouristMapView from '../components/tourist/TouristMapView';
import WeatherAdvisory from '../components/tourist/WeatherAdvisory'; // 1. Import the new component

const TouristDashboard = () => {
  const handlePanic = () => {
    alert(`PANIC SIGNAL SENT!
    Location: ${singleTourist.currentLocation.lat}, ${singleTourist.currentLocation.lng}
    Authorities and your emergency contacts have been notified.`);
  };

  return (
    <div className="tourist-dashboard">
      <div className="left-panel">
        <DigitalIDCard tourist={singleTourist} />
        {/* 2. Add the WeatherAdvisory component here */}
        <WeatherAdvisory location={singleTourist.currentLocation} />
        <SafetyScore score={singleTourist.safetyScore} />
        <PanicButton onPanic={handlePanic} />
      </div>
      <div className="right-panel">
        <TouristMapView tourist={singleTourist} zones={highRiskZones} />
      </div>
    </div>
  );
};

export default TouristDashboard;