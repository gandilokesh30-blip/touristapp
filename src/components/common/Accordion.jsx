// src/components/common/Accordion.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-card">
      <button className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <div className="accordion-icon">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;