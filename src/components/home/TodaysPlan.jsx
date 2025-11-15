// src/components/home/TodaysPlan.jsx
import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaRegCircle, FaTrash, FaPlus } from 'react-icons/fa';

const TodaysPlan = () => {
  // --- STATE MANAGEMENT ---
  // The list of plan items, loaded from localStorage
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem('todaysPlan');
    return savedPlan ? JSON.parse(savedPlan) : []; // Default to an empty array
  });

  // The text for the new item being added
  const [newItemText, setNewItemText] = useState('');

  // --- LOCALSTORAGE SYNC ---
  // This effect runs every time the 'plan' state changes, saving it automatically.
  useEffect(() => {
    localStorage.setItem('todaysPlan', JSON.stringify(plan));
  }, [plan]);

  // --- HANDLER FUNCTIONS ---
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() === '') return; // Don't add empty items

    const newItem = {
      id: Date.now(), // Use a timestamp for a unique ID
      task: newItemText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      completed: false
    };
    
    setPlan([...plan, newItem]);
    setNewItemText(''); // Clear the input field after adding
  };

  const handleToggleComplete = (taskId) => {
    setPlan(plan.map(item =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleDeleteItem = (taskId) => {
    // Prevent the item from being toggled when the delete button is clicked
    window.event.stopPropagation();
    setPlan(plan.filter(item => item.id !== taskId));
  };

  // --- CALCULATIONS FOR PROGRESS BAR ---
  const completedCount = plan.filter(item => item.completed).length;
  const totalCount = plan.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="todays-plan-card">
      <h3>My Daily Itinerary</h3>
      
      {/* Input Form to add new items */}
      <form onSubmit={handleAddItem} className="add-item-form">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="e.g., Visit the local market"
        />
        <button type="submit"><FaPlus /></button>
      </form>
      
      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="progress-section">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p className="progress-text">{completedCount} of {totalCount} completed</p>
        </div>
      )}

      {/* Itinerary List */}
      <ul className="plan-list">
        {plan.length > 0 ? (
          plan.map(item => (
            <li 
              key={item.id} 
              className={`plan-item ${item.completed ? 'completed' : ''}`}
              onClick={() => handleToggleComplete(item.id)}
            >
              <div className="item-icon">
                {item.completed ? <FaCheckCircle /> : <FaRegCircle />}
              </div>
              <div className="item-details">
                <span className="task">{item.task}</span>
                <span className="time"><FaClock /> Added at {item.time}</span>
              </div>
              <button 
                className="delete-button" 
                onClick={() => handleDeleteItem(item.id)}
              >
                <FaTrash />
              </button>
            </li>
          ))
        ) : (
          <p className="empty-plan-message">Your plan for today is empty. Add an activity to get started!</p>
        )}
      </ul>
    </div>
  );
};

export default TodaysPlan;