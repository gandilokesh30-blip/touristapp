// src/components/dashboard/IncidentList.jsx
import React from 'react';
import { FaExclamationTriangle, FaBan, FaHourglassHalf, FaHeartbeat } from 'react-icons/fa';
import IncidentActions from './IncidentActions'; // Import the new component

const IncidentList = ({ incidents, onAcknowledge, onResolve }) => { // Add new props
    const getIcon = (type) => {
        if (type.includes('SOS')) return <FaHeartbeat color="red" />;
        if (type.includes('Panic')) return <FaExclamationTriangle color="red" />;
        if (type.includes('Geo-fence')) return <FaBan color="orange" />;
        if (type.includes('Inactivity')) return <FaHourglassHalf color="blue" />;
        return null;
    }

    const getPriorityClass = (priority) => {
        if (priority === 'Critical') return 'priority-critical';
        if (priority === 'High') return 'priority-high';
        return 'priority-medium';
    };

  return (
    <div className="list-card">
      <h3>Recent Incidents ({incidents.length})</h3>
      <ul className="list-items">
        {incidents.map(incident => (
          <li key={incident.id} className={`list-item incident-item ${getPriorityClass(incident.priority)}`}>
            <div className="incident-icon">{getIcon(incident.type)}</div>
            <div className="incident-details">
              <strong>{incident.type}</strong>
              <p>ID: {incident.touristId} | {incident.timestamp}</p>
            </div>
            <IncidentActions 
              incident={incident}
              onAcknowledge={onAcknowledge}
              onResolve={onResolve}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;