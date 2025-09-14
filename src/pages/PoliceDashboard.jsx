// src/pages/PoliceDashboard.jsx
import React, { useState, useEffect } from 'react';
import { allTourists, incidents as initialIncidents, highRiskZones } from '../data/mockData';
import DashboardMap from '../components/dashboard/DashboardMap';
import TouristList from '../components/dashboard/TouristList';
import IncidentList from '../components/dashboard/IncidentList';
import TouristDetailModal from '../components/dashboard/TouristDetailModal';

const PoliceDashboard = () => {
  const [tourists, setTourists] = useState(allTourists);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedTourist, setSelectedTourist] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tourists.length);
      const randomTourist = tourists[randomIndex];

      if (randomTourist.status === 'Missing') return;

      const anomalyChance = Math.random();
      if (anomalyChance > 0.7) {
        setTourists(prevTourists => 
          prevTourists.map(t => {
            if (t.id === randomTourist.id) {
              const newStatus = t.status === 'Safe' ? 'Alert' : 'Safe';
              console.log(`AI SIMULATION: Status of ${t.name} changed to ${newStatus}`);
              
              if (newStatus === 'Alert') {
                const newIncident = {
                  // === THE FIX IS HERE: Add a random string to ensure uniqueness ===
                  id: `I${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                  touristId: t.id,
                  type: 'Prolonged Inactivity',
                  timestamp: new Date().toLocaleString(),
                  location: `${t.currentLocation.lat}, ${t.currentLocation.lng}`,
                  status: 'Pending'
                };
                setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
              }
              
              return { ...t, status: newStatus };
            }
            return t;
          })
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [tourists]);

  const handleSelectTourist = (tourist) => {
    setSelectedTourist(tourist);
  };

  const handleCloseModal = () => {
    setSelectedTourist(null);
  };
  
  const handleGenerateFIR = (tourist) => {
    alert(`E-FIR Generation Initiated for Missing Person...`);
  };

  return (
    <>
      <div className="police-dashboard">
        <div className="dashboard-main">
          <h2 className="dashboard-title">Real-Time Tourist Monitoring</h2>
          <DashboardMap 
              tourists={tourists} 
              zones={highRiskZones} 
              selectedTourist={selectedTourist} 
          />
        </div>
        <div className="dashboard-sidebar">
          <TouristList 
              tourists={tourists} 
              onSelectTourist={handleSelectTourist}
              onGenerateFIR={handleGenerateFIR}
          />
          <IncidentList incidents={incidents} />
        </div>
      </div>
      
      <TouristDetailModal 
        tourist={selectedTourist}
        incidents={incidents}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PoliceDashboard;