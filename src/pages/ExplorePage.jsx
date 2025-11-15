// src/pages/ExplorePage.jsx
import React, { useState } from 'react';
import { destinations } from '../data/mockData';
import DestinationCard from '../components/explore/DestinationCard';
import PhotoGalleryModal from '../components/explore/PhotoGalleryModal'; // Import the new modal

const ExplorePage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleOpenGallery = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseGallery = () => {
    setSelectedDestination(null);
  };

  return (
    <div>
      <h1 className="explore-title">Explore Beautiful India</h1>
      <div className="explore-grid">
        {destinations.map(dest => (
          // Pass the handler function down to the card
          <DestinationCard 
            key={dest.id} 
            destination={dest} 
            onCardClick={handleOpenGallery}
          />
        ))}
      </div>

      {/* The Modal is rendered here, but only visible when a destination is selected */}
      {selectedDestination && (
        <PhotoGalleryModal 
          destination={selectedDestination}
          onClose={handleCloseGallery}
        />
      )}
    </div>
  );
};

export default ExplorePage;