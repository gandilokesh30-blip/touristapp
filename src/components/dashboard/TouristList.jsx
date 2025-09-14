import React from 'react';
import { FaFileSignature } from 'react-icons/fa';

const TouristList = ({ tourists, onSelectTourist, onGenerateFIR }) => {
  const getStatusClass = (status) => {
    if (status === 'Safe') return 'status-safe';
    if (status === 'Alert') return 'status-alert';
    return 'status-missing';
  };

  return (
    <div className="list-card">
      <h3>Active Tourists ({tourists.length})</h3>
      <ul className="list-items">
        {tourists.map(tourist => (
          <li key={tourist.id} className="list-item" onClick={() => onSelectTourist(tourist)}>
            <div>
              <strong>{tourist.name}</strong>
              <p>ID: {tourist.id}</p>
            </div>
            <div className="status-section">
                <span className={`status-badge ${getStatusClass(tourist.status)}`}>
                    {tourist.status}
                </span>
                {tourist.status === 'Missing' && (
                    <button 
                        className="fir-button" 
                        onClick={(e) => { e.stopPropagation(); onGenerateFIR(tourist); }}
                        title="Generate E-FIR"
                    >
                        <FaFileSignature />
                    </button>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TouristList;