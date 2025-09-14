// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserTie } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Import the hook

const HomePage = () => {
  const { t } = useTranslation(); // Initialize the hook

  return (
    <div className="home-container">
      <h1>{t('homeTitle')}</h1>
      <p>{t('homeSubtitle')}</p>
      <div className="role-selection">
        <Link to="/tourist" className="role-card">
          <FaUserShield size={70} />
          <h2>{t('touristPortal')}</h2>
          <p>{t('touristPortalDesc')}</p>
        </Link>
        <Link to="/dashboard" className="role-card">
          <FaUserTie size={70} />
          <h2>{t('authorityDashboard')}</h2>
          <p>{t('authorityDashboardDesc')}</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;