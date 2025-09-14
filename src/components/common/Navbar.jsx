// src/components/common/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserShield, FaClipboardList } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">STS-Portal</NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
              <FaHome /> <span>Home</span> {/* Text wrapped in span */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tourist" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
              <FaUserShield /> <span>Tourist View</span> {/* Text wrapped in span */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
              <FaClipboardList /> <span>Authority Dashboard</span> {/* Text wrapped in span */}
            </NavLink>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;