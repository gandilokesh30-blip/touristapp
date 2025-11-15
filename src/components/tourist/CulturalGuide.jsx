// src/components/tourist/CulturalGuide.jsx
import React from 'react';
import { culturalTipsDb } from '../../data/mockData';

// We'll simulate the tourist is in Assam for this demo
const CulturalGuide = ({ region = "Assam" }) => {
  const tips = culturalTipsDb[region] || {};
  return (
    <div className="ai-feature-card">
      <div className="tip-section">
        <strong>Greeting:</strong><p>"{tips.greeting}" is a common and respectful way to greet locals.</p>
      </div>
      <div className="tip-section">
        <strong>Etiquette:</strong><p>{tips.etiquette}</p>
      </div>
       <div className="tip-section">
        <strong>Dress Code:</strong><p>{tips.dressCode}</p>
      </div>
    </div>
  );
};
export default CulturalGuide;