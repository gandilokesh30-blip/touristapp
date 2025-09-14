// src/components/dashboard/TouristDetailModal.jsx
import React from 'react';
import DigitalIDCard from '../tourist/DigitalIDCard';

const TouristDetailModal = ({ tourist, incidents, onClose }) => {
  if (!tourist) return null;

  const touristIncidents = incidents.filter(inc => inc.touristId === tourist.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>Tourist Details</h2>
        <div className="modal-body">
            <DigitalIDCard tourist={tourist} />
            <div className="incident-history">
                <h4>Incident History</h4>
                {touristIncidents.length > 0 ? (
                    <ul>
                        {touristIncidents.map(inc => (
                            <li key={inc.id}>
                                <strong>{inc.type}</strong> on {inc.timestamp} - Status: {inc.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No incidents recorded for this tourist.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDetailModal;