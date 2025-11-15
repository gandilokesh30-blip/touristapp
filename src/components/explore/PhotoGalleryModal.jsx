// src/components/explore/PhotoGalleryModal.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Generate multiple, unique photos from a free API
const generatePhotoUrls = (query, count = 5) => {
  return Array.from({ length: count }, (_, i) => 
    `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}&sig=${i}`
  );
};

const PhotoGalleryModal = ({ destination, onClose }) => {
  const [photos] = useState(() => generatePhotoUrls(destination.queryTerm));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!destination) return null;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="modal-overlay gallery-overlay" onClick={onClose}>
      <div className="gallery-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        <div className="gallery-slider">
          <div className="gallery-slide" style={{ backgroundImage: `url(${photos[currentIndex]})` }}></div>
          <button className="slider-arrow left" onClick={goToPrevious}><FaArrowLeft /></button>
          <button className="slider-arrow right" onClick={goToNext}><FaArrowRight /></button>
        </div>

        <div className="gallery-info">
          <h2>{destination.name}</h2>
          <p>{destination.description}</p>
          <Link to={`/explore/${destination.id}`} className="gallery-map-button">
            <FaMapMarkedAlt /> View Route on Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryModal;