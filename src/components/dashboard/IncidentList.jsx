import React from 'react';
import { FaExclamationTriangle, FaBan, FaHourglassHalf } from 'react-icons/fa';

const IncidentList = ({ incidents }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Panic Button': return <FaExclamationTriangle color="red" />;
            case 'Geo-fence Breach': return <FaBan color="orange" />;
            case 'Prolonged Inactivity': return <FaHourglassHalf color="blue" />;
            default: return null;
        }
    }
  return (
    <div className="list-card">
      <h3>Recent Incidents ({incidents.length})</h3>
      <ul className="list-items">
        {incidents.map(incident => (
          <li key={incident.id} className="list-item">
            <div className="incident-icon">{getIcon(incident.type)}</div>
            <div>
              <strong>{incident.type}</strong>
              <p>Tourist ID: {incident.touristId} | {incident.timestamp}</p>
            </div>
            <span className="incident-status">{incident.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;