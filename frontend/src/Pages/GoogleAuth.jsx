// App.js or any other React component file
import React, { useEffect } from 'react';

const GoogleAuth = () => {
 
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
