// src/components/explore/DestinationCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { FaMapMarkerAlt } from 'react-icons/fa';

const DestinationCard = ({ destination }) => {
  return (
    // Wrap the entire div in a Link component
    <Link to={`/explore/${destination.id}`} className="destination-card-link">
      <div className="destination-card">
        <img src={destination.imageUrl} alt={destination.name} className="destination-image" />
        <div className="destination-info">
          <h3>{destination.name}</h3>
          <p className="location"><FaMapMarkerAlt /> {destination.location}</p>
          <p className="description">{destination.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;