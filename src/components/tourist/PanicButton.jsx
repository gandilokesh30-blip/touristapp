// src/components/tourist/PanicButton.jsx
import React from 'react';
import { FaExclamationTriangle, FaMicrophone } from 'react-icons/fa';

const PanicButton = ({ onPanic, isRecording, countdown }) => {
  return (
    <div className="panic-card">
      <button 
        className={`panic-button ${isRecording ? 'recording' : ''}`} 
        onClick={onPanic}
        disabled={isRecording}
      >
        {isRecording ? (
          <>
            <FaMicrophone size={40} />
            <span>RECORDING...</span>
            <span className="countdown">{countdown}</span>
          </>
        ) : (
          <>
            <FaExclamationTriangle size={40} />
            <span>PANIC</span>
          </>
        )}
      </button>
      <p>
        {isRecording 
          ? "Recording audio for evidence. Stay on the line." 
          : "Press in case of emergency. Your location will be shared and audio will be recorded."
        }
      </p>
    </div>
  );
};

export default PanicButton;