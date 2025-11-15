// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
// 1. Import the provider from the Google library
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import App from './App.jsx';
import './i18n';
import './index.css';
import 'leaflet/dist/leaflet.css';

// 2. Read your secure Google Client ID from the .env file
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// A check to make sure the key is loaded
if (!googleClientId) {
  console.error("Fatal Error: VITE_GOOGLE_CLIENT_ID is not defined in the .env file. The application cannot start.");
}

// Create a router with future flags
const basename = import.meta.env.BASE_URL || '/';
const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <App />,
    },
  ],
  {
    basename,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={googleClientId}
      onScriptLoadError={() => console.error('Google OAuth script failed to load')}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);