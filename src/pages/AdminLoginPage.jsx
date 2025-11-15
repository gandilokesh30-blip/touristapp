// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { FaLock, FaUserTie } from 'react-icons/fa';

const AdminLoginPage = ({ onAdminLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be a secure check. Here we use a simple 'secret password'.
    if (password === 'admin123') {
      onAdminLogin();
    } else {
      setError('Invalid Access Code.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <FaUserTie size={40} color="var(--dark-color)" />
        <h2>Authority Access</h2>
        <p>Please enter the access code to proceed to the monitoring dashboard.</p>
        <form onSubmit={handleAdminSubmit}>
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Access Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button authority">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;