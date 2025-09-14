import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const PanicButton = ({ onPanic }) => {
  return (
    <div className="panic-card">
      <button className="panic-button" onClick={onPanic}>
        <FaExclamationTriangle size={40} />
        <span>PANIC</span>
      </button>
      <p>Press in case of emergency. Your location will be shared instantly.</p>
    </div>
  );
};

export default PanicButton;