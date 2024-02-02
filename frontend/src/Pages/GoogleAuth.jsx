// App.js or any other React component file
import React, { useEffect } from 'react';

const GoogleAuth = () => {
  useEffect(() => {
    // Check if there is user data in the URL (after callback)
    const urlParams = new URLSearchParams(window.location.search);
    const userDataParam = urlParams.get('userData');

    if (userDataParam) {
      // Decode user data from base64
      const userDataString = atob(userDataParam);
      const userData = JSON.parse(userDataString);

      // Store userData in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to remove query parameters from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Run this effect only once on component mount

  const handleGoogleAuthClick = () => {
    // Redirect to the Google authentication route on your backend
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div>
      {/* Add a button to initiate Google authentication */}
      <button onClick={handleGoogleAuthClick}>Login with Google</button>

      {/* Your other React components and UI */}
    </div>
  );
};

export default GoogleAuth;
