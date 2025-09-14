// src/App.jsx

import React from 'react';
// 1. REMOVE BrowserRouter from this import
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TouristDashboard from './pages/TouristDashboard';
import PoliceDashboard from './pages/PoliceDashboard';
import Navbar from './components/common/Navbar';

function App() {
  return (
    // 2. REMOVE the <Router> tags from here
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tourist" element={<TouristDashboard />} />
          <Route path="/dashboard" element={<PoliceDashboard />} />
        </Routes>
      </main>
    </>
    // 3. And REMOVE the closing </Router> tag
  );
}

export default App;