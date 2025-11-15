// src/components/tourist/SmartBandSim.jsx
import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaExclamationTriangle } from 'react-icons/fa';

const SmartBandSim = ({ tourist }) => {
  const [heartRate, setHeartRate] = useState(75);
  const [status, setStatus] = useState('Nominal');

  // Effect to simulate a fluctuating heart rate
  useEffect(() => {
    const interval = setInterval(() => {
      // If status is not distress, simulate a normal heart rate
      if (status !== 'Distress') {
        const randomFluctuation = Math.floor(Math.random() * 10) - 5; // -5 to +5
        setHeartRate(prevRate => Math.max(60, Math.min(100, prevRate + randomFluctuation)));
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [status]);

  // Function to simulate a distress event (e.g., high heart rate)
  const simulateDistress = () => {
    setStatus('Distress');
    setHeartRate(155); // Simulate a sudden spike in heart rate

    // Use localStorage to send a signal to the "Police Dashboard"
    localStorage.setItem('iot_distress_signal', tourist.id);
    
    // Reset back to normal after 10 seconds
    setTimeout(() => {
      setStatus('Nominal');
      localStorage.removeItem('iot_distress_signal'); // The police "backend" would handle this, but we simulate cleanup
    }, 10000);
  };

  const getStatusColor = () => {
    if (status === 'Distress') return 'var(--danger-color)';
    return 'var(--success-color)';
  };

  return (
    <div className="smart-band-card">
      <h4>IoT Smart Band</h4>
      <div className="band-status">
        <div className="heart-rate-display">
          <FaHeartbeat className="heart-icon" style={{ color: getStatusColor() }} />
          <p className="rate">{heartRate} <span>BPM</span></p>
        </div>
        <p className="status-text" style={{ color: getStatusColor() }}>
          Status: {status}
        </p>
      </div>
      <button onClick={simulateDistress} className="distress-button" disabled={status === 'Distress'}>
        <FaExclamationTriangle /> Simulate Distress Event
      </button>
    </div>
  );
};

export default SmartBandSim;