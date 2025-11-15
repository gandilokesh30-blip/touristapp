// src/components/common/ItineraryModal.jsx
import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaRegCircle, FaTrash, FaPlus } from 'react-icons/fa';

// === NEW HELPER FUNCTION TO FORMAT TIME ===
// This function takes a 24-hour time string (e.g., "14:30")
// and converts it to a 12-hour AM/PM format (e.g., "2:30 PM").
const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hourString, minute] = timeString.split(':');
  const hour = +hourString; // Convert string to number
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format (0 becomes 12)
  return `${formattedHour}:${minute} ${ampm}`;
};
// =======================================

const ItineraryModal = ({ isOpen, onClose }) => {
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem('todaysPlan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });
  
  const [newItemText, setNewItemText] = useState('');
  const [newItemTime, setNewItemTime] = useState('12:00');

  useEffect(() => {
    const sortedPlan = [...plan].sort((a, b) => a.time.localeCompare(b.time));
    localStorage.setItem('todaysPlan', JSON.stringify(sortedPlan));
  }, [plan]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;

    const newItem = {
      id: Date.now(),
      task: newItemText,
      time: newItemTime, // Still save in 24-hour format for easy sorting
      completed: false
    };
    
    setPlan(prevPlan => [...prevPlan, newItem]);
    
    setNewItemText('');
    setNewItemTime('12:00');
  };

  const handleToggleComplete = (taskId) => {
    setPlan(plan.map(item =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleDeleteItem = (taskId, e) => {
    e.stopPropagation();
    setPlan(plan.filter(item => item.id !== taskId));
  };

  if (!isOpen) return null;

  const completedCount = plan.filter(item => item.completed).length;
  const totalCount = plan.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const sortedPlanForRender = [...plan].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content itinerary-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h3>My Daily Itinerary</h3>
        
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            className="task-input"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="e.g., Visit the local market"
          />
          <input 
            type="time" 
            className="time-input"
            value={newItemTime}
            onChange={(e) => setNewItemTime(e.target.value)}
          />
          <button type="submit"><FaPlus /></button>
        </form>
        
        {totalCount > 0 && (
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="progress-text">{completedCount} of {totalCount} completed</p>
          </div>
        )}

        <ul className="plan-list">
          {sortedPlanForRender.length > 0 ? (
            sortedPlanForRender.map(item => (
              <li key={item.id} className={`plan-item ${item.completed ? 'completed' : ''}`} onClick={() => handleToggleComplete(item.id)}>
                <div className="item-icon">{item.completed ? <FaCheckCircle /> : <FaRegCircle />}</div>
                <div className="item-details">
                  <span className="task">{item.task}</span>
                  {/* === THE FIX IS HERE: Use our new formatTime function for display === */}
                  <span className="time"><FaClock /> {formatTime(item.time)}</span>
                </div>
                <button className="delete-button" onClick={(e) => handleDeleteItem(item.id, e)}><FaTrash /></button>
              </li>
            ))
          ) : (
            <p className="empty-plan-message">Your plan for today is empty. Add an activity!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ItineraryModal;