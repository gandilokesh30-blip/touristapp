// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TouristDashboard from './pages/TouristDashboard';
import PoliceDashboard from './pages/PoliceDashboard';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ExplorePage from './pages/ExplorePage';
import DestinationMapPage from './pages/DestinationMapPage';
import Navbar from './components/common/Navbar';

const ProtectedRoute = ({ userRole, children }) => {
  // We still need to protect routes, so this component remains useful
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTouristLogin = () => {
    setUserRole('tourist'); // Still set the role for protection
    navigate('/home');
  };

  const handleAdminLogin = () => {
    setUserRole('authority');
    navigate('/home'); // Go to the homepage after admin login as well
  };

  return (
    <>
      {/* The Navbar component no longer needs the userRole prop */}
      {userRole && <Navbar />}
      <main className={
        location.pathname === '/' || location.pathname === '/admin-login' 
        ? '' 
        : 'container'
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage onLogin={handleTouristLogin} />} />
          <Route path="/admin-login" element={<AdminLoginPage onAdminLogin={handleAdminLogin} />} />

          
          {/* Protected Routes - anyone logged in can access these */}
          <Route path="/home" element={<ProtectedRoute userRole={userRole}><HomePage /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute userRole={userRole}><ExplorePage /></ProtectedRoute>} />
          <Route path="/explore/:destinationId" element={<ProtectedRoute userRole={userRole}><DestinationMapPage /></ProtectedRoute>} />
          <Route path="/tourist" element={<ProtectedRoute userRole={userRole}><TouristDashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute userRole={userRole}><PoliceDashboard /></ProtectedRoute>} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={userRole ? "/home" : "/"} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;