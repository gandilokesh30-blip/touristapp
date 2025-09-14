// src/components/tourist/DigitalIDCard.jsx

import React from 'react';
// === WE NO LONGER IMPORT THE IMAGE HERE ===
import { FaPassport, FaCalendarAlt, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';

const DigitalIDCard = ({ tourist }) => {
  if (!tourist) {
    return (
      <div className="id-card">
        <p>Loading tourist data...</p>
      </div>
    );
  }

  return (
    <div className="id-card">
      <div className="id-header">
        {/* The src path is now a simple string pointing to the root */}
        <img src="/user-profile.png" alt="Tourist" className="profile-pic" />
        
        <div className="header-info">
          <h3>{tourist.name || 'Unnamed Tourist'}</h3>
          <p>{tourist.nationality || 'Nationality not provided'}</p>
        </div>
      </div>
      <div className="id-body">
        <p><FaPassport /> <strong>ID:</strong> {tourist.id || 'N/A'} ({tourist.kyc || 'N/A'})</p>
        <p><FaCalendarAlt /> <strong>Visit Duration:</strong> {tourist.entryDate || 'N/A'} to {tourist.exitDate || 'N/A'}</p>
        <p>
          <FaMapMarkedAlt /> <strong>Itinerary:</strong> {tourist.itinerary?.join(', ') || 'Itinerary not provided'}
        </p>
        <h4>Emergency Contacts</h4>
        <ul>
          {tourist.emergencyContacts && tourist.emergencyContacts.length > 0 ? (
            tourist.emergencyContacts.map(contact => (
              <li key={contact.name}><FaPhoneAlt /> {contact.name}: {contact.phone}</li>
            ))
          ) : (
            <li>No emergency contacts listed.</li>
          )}
        </ul>
      </div>
      <div className="id-footer">
        <div className="blockchain-sim">
          <span className="dot"></span> Blockchain Verified
        </div>
      </div>
    </div>
  );
};

export default DigitalIDCard;