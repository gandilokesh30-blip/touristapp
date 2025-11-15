// src/components/tourist/EmergencyNetwork.jsx
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { emergencyContactsDb } from '../../data/mockData';

// We'll simulate the tourist is in Guwahati for this demo
const EmergencyNetwork = ({ city = "Guwahati" }) => {
  const contacts = emergencyContactsDb[city] || [];
  return (
    <div className="ai-feature-card">
      <p>Quick access contacts for your current region:</p>
      <ul className="emergency-list">
        {contacts.map(contact => (
          <li key={contact.name}>
            <span>{contact.name}</span>
            <a href={`tel:${contact.phone}`} className="phone-link">
              <FaPhoneAlt /> {contact.phone}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EmergencyNetwork;