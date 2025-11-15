// src/pages/PoliceDashboard.jsx
import React, { useState, useEffect } from 'react';
import { allTourists, incidents as initialIncidents, highRiskZones } from '../data/mockData';
import DashboardMap from '../components/dashboard/DashboardMap';
import TouristList from '../components/dashboard/TouristList';
import IncidentList from '../components/dashboard/IncidentList';
import TouristDetailModal from '../components/dashboard/TouristDetailModal';

// Haversine formula to calculate distance between two lat/lng points in meters.
const calculateDistance = (point1, point2) => {
  const R = 6371e3; // metres
  const φ1 = point1.lat * Math.PI/180;
  const φ2 = point2.lat * Math.PI/180;
  const Δφ = (point2.lat-point1.lat) * Math.PI/180;
  const Δλ = (point2.lng-point1.lng) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // in metres
}

const PoliceDashboard = () => {
  const [tourists, setTourists] = useState(allTourists);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedTourist, setSelectedTourist] = useState(null);

  // --- AI SIMULATION ENGINE ---
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      // 1. Simulate Tourist Movement
      const movingTouristIndex = Math.floor(Math.random() * tourists.length);
      const updatedTourists = tourists.map((tourist, index) => {
        if (index === movingTouristIndex && tourist.status !== 'Missing') {
          const newLat = tourist.currentLocation.lat + (Math.random() - 0.5) * 0.01;
          const newLng = tourist.currentLocation.lng + (Math.random() - 0.5) * 0.01;
          return { ...tourist, currentLocation: { lat: newLat, lng: newLng } };
        }
        return tourist;
      });
      setTourists(updatedTourists);

      // 2. Check for Geo-Fence Breaches
      updatedTourists.forEach(tourist => {
        highRiskZones.forEach(zone => {
          const distance = calculateDistance(tourist.currentLocation, zone.center);
          if (distance < zone.radius) {
            const hasBreachIncident = incidents.some(inc => inc.touristId === tourist.id && inc.type === 'Geo-fence Breach' && inc.status !== 'Resolved');
            if (!hasBreachIncident) {
              console.log(`GEO-FENCE BREACH by ${tourist.name} into ${zone.name}`);
              const newBreachIncident = {
                id: `GF-${Date.now()}`,
                touristId: tourist.id,
                type: 'Geo-fence Breach',
                timestamp: new Date().toLocaleString(),
                location: `${tourist.currentLocation.lat.toFixed(4)}, ${tourist.currentLocation.lng.toFixed(4)}`,
                status: 'Pending',
                priority: 'High'
              };
              setIncidents(prev => [newBreachIncident, ...prev]);
            }
          }
        });
      });

    }, 4000); // Run simulation every 4 seconds

    return () => clearInterval(simulationInterval);
  }, [tourists, incidents]);

  // IoT distress signal listener
  useEffect(() => {
    const iotInterval = setInterval(() => {
      const distressId = localStorage.getItem('iot_distress_signal');
      
      if (distressId) {
        const touristInDistress = tourists.find(t => t.id === distressId);
        const existingSos = incidents.some(inc => inc.touristId === distressId && inc.type.includes('SOS'));

        if (touristInDistress && !existingSos) {
          const newSosIncident = {
            id: `SOS-${Date.now()}`,
            touristId: distressId,
            type: 'SOS from Smart Band (High Heart Rate)',
            timestamp: new Date().toLocaleString(),
            location: `${touristInDistress.currentLocation.lat.toFixed(4)}, ${touristInDistress.currentLocation.lng.toFixed(4)}`,
            status: 'CRITICAL',
            priority: 'Critical'
          };
          setIncidents(prev => [newSosIncident, ...prev]);
          setTourists(prev => 
            prev.map(t => 
              t.id === distressId ? { ...t, status: 'Alert' } : t
            )
          );
        }
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(iotInterval);
  }, [tourists, incidents]);

  // --- Incident Management Functions ---
  const handleAcknowledge = (incidentId) => {
    setIncidents(incidents.map(inc => inc.id === incidentId ? { ...inc, status: 'Acknowledged' } : inc));
  };
  const handleResolve = (incidentId) => {
    setIncidents(incidents.map(inc => inc.id === incidentId ? { ...inc, status: 'Resolved' } : inc));
  };
  
  const handleSelectTourist = (tourist) => setSelectedTourist(tourist);
  const handleCloseModal = () => setSelectedTourist(null);
  const handleGenerateFIR = (tourist) => alert(`E-FIR for ${tourist.name} initiated.`);
  const handlePingTourist = (tourist) => {
    localStorage.setItem('locationRequest', tourist.id);
    alert(`Location ping sent to ${tourist.name}.`);
  };

  return (
    <>
      <div className="police-dashboard">
        <div className="dashboard-main">
          <h2 className="dashboard-title">Real-Time Tourist Monitoring</h2>
          <DashboardMap tourists={tourists} zones={highRiskZones} selectedTourist={selectedTourist} />
        </div>
        <div className="dashboard-sidebar">
          <TouristList tourists={tourists} onSelectTourist={handleSelectTourist} onGenerateFIR={handleGenerateFIR} onPingTourist={handlePingTourist} />
          <IncidentList incidents={incidents} onAcknowledge={handleAcknowledge} onResolve={handleResolve} />
        </div>
      </div>
      <TouristDetailModal tourist={selectedTourist} incidents={incidents} onClose={handleCloseModal} />
    </>
  );
};

export default PoliceDashboard;