// App.js or any other React component file
import React from 'react';
const GoogleAuth = () => {
 
  const handleGoogleAuthClick = () => {
    // Redirect to the Google authentication route on your backend
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className='flex  gap-10 items-center border border-[#e6dfdf]  h-8 rounded-sm'>
  <img src="google.png" alt="google"  className='size-4 ml-5 '/> 
      <button onClick={handleGoogleAuthClick}>
        Login with Google</button>
           
  
    </div>
  );
};

export default GoogleAuth;


