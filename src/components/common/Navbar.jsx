// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserShield, FaClipboardList, FaBinoculars, FaCalendarCheck } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import ItineraryModal from './ItineraryModal';

// Navbar is now simple and doesn't need to know the user's role
const Navbar = () => {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/home" className="nav-logo">
            STS-Portal
          </NavLink>
          <ul className="nav-menu">
            
            {/* --- All 4 Links/Buttons are now always visible --- */}
            <li className="nav-item">
              <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                <FaHome /> <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tourist" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                <FaUserShield /> <span>Tourist</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                <FaClipboardList /> <span>Authority</span>
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink to="/explore" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                <FaBinoculars /> <span>Explore</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <button onClick={() => setIsItineraryOpen(true)} className="nav-button">
                <FaCalendarCheck /> <span>Daily Plans</span>
              </button>
            </li>
          </ul>
          <LanguageSwitcher />
        </div>
      </nav>
      
      {/* The Itinerary Modal is controlled here */}
      <ItineraryModal isOpen={isItineraryOpen} onClose={() => setIsItineraryOpen(false)} />
    </>
  );
};

export default Navbar;