// src/components/tourist/AiPlanner.jsx
import React, { useState } from 'react';
import { FaRobot, FaSpinner } from 'react-icons/fa';

const AiPlanner = () => {
  const [destination, setDestination] = useState('');
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsLoading(true);
    // Simulate an AI thinking for 2 seconds
    setTimeout(() => {
      const generatedPlan = [
        `9:00 AM: Start your day at the famous ${destination} viewpoint.`,
        `11:00 AM: Explore the local craft market.`,
        `1:00 PM: Enjoy lunch at a highly-rated local restaurant.`,
        `3:00 PM: Visit the historical museum or gallery.`,
        `5:00 PM: Relax and watch the sunset.`
      ];
      setPlan(generatedPlan);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="ai-feature-card">
      <form onSubmit={handleGeneratePlan} className="ai-planner-form">
        <input 
          type="text" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter a city or landmark"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <FaSpinner className="spinner" /> : <><FaRobot /> Generate</>}
        </button>
      </form>
      {plan && (
        <div className="generated-plan">
          <h4>Suggested Itinerary for {destination}:</h4>
          <ul>
            {plan.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
export default AiPlanner;