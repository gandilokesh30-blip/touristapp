// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = ({ onLogin }) => {
  // State for the sign-up form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reusable function to send email notifications
  const sendEmailNotification = (templateId, templateParams) => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set!");
      return Promise.resolve();
    }
  
    setIsSubmitting(true);
    return emailjs.send(serviceID, templateId, templateParams, publicKey);
  };

  // --- Sign Up Form Submission ---
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const alphabetOnly = /^[a-zA-Z\s]+$/;
    if (!alphabetOnly.test(username)) {
      alert('Username must contain only alphabetic characters and spaces.');
      return;
    }
    
    console.log('New user signed up via form:', { username, email, password });
    const templateParams = { user_name: username, user_email: email, signup_time: new Date().toLocaleString(), to_email: 'nemmadiarunkumar@gmail.com' };
    sendEmailNotification(import.meta.env.VITE_EMAILJS_SIGNUP_TEMPLATE_ID, templateParams)
      .then(() => alert(`Welcome, ${username}! You have been successfully registered.`))
      .catch(() => alert('Registration complete, but the notification email failed to send.'))
      .finally(() => onLogin('tourist'));
  };

  // --- Google Login Success Handler ---
  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login response:', credentialResponse);
    
    if (!credentialResponse.credential) {
      console.error('No credential received from Google');
      console.log('Full response:', credentialResponse);
      return;
    }
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Decoded JWT:', decoded);
      
      if (!decoded.email_verified) {
        throw new Error('Email not verified by Google');
      }
      
      // Send welcome email
      const templateParams = {
        user_name: decoded.name || 'User',
        user_email: decoded.email || '',
        login_time: new Date().toLocaleString(),
        to_email: 'nemmadiarunkumar@gmail.com'
      };
      
      sendEmailNotification(import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => console.log('Welcome email sent'))
        .catch(err => console.error('Failed to send welcome email:', err));
      
      // Proceed with login
      onLogin('tourist');
    } catch (error) {
      console.error('Error processing Google login:', error);
      alert(`Google login failed: ${error.message || 'Unknown error'}`);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    alert('Failed to authenticate with Google. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Join as a Tourist</h2>
        <p>Create an account to access safety features and explore destinations.</p>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUpSubmit}>
          <div className="input-group">
            <FaUser />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <FaEnvelope />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* Google Login Button */}
        <div className="google-login-container">
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              auto_select={false}
              text="continue_with"
              shape="rectangular"
              theme="outline"
              size="large"
              width="300"
              ux_mode="popup"
              itp_support={true}
              state_cookie_domain={window.location.hostname}
              prompt_parent_id="google-login-button"
              nonce=""
              cancel_on_tap_outside={true}
              context="use"
              click_listener={() => console.log('Google button clicked')}
            />
            <div id="google-login-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;