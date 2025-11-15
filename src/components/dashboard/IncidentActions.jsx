// src/components/dashboard/IncidentActions.jsx
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const IncidentActions = ({ incident, onAcknowledge, onResolve }) => {
  if (incident.status === 'Resolved') {
    return <span className="action-status-resolved">Resolved</span>;
  }

  return (
    <div className="incident-actions">
      {incident.status === 'Pending' && (
        <button
          className="action-button acknowledge"
          title="Acknowledge"
          onClick={() => onAcknowledge(incident.id)}
        >
          <FaCheck />
        </button>
      )}
      <button
        className="action-button resolve"
        title="Resolve"
        onClick={() => onResolve(incident.id)}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default IncidentActions;