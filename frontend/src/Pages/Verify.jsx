import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (userId) { // Check if userId is defined
      const verifyEmail = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/verify?id=${userId}`);
          const data = response.data;
          if (data.success) {
            setVerificationStatus('success');
          } else {
            setVerificationStatus('error');
          }
        } catch (error) {
          console.error('Error:', error);
          setVerificationStatus('error');
        }
      };

      verifyEmail();
    } else {
      console.error('Error: userId is undefined');
      setVerificationStatus('error');
    }
  }, [userId]);

  return (
    <div>
      {verificationStatus === 'success' && (
        <p>Email successfully verified!</p>
      )}
      {verificationStatus === 'error' && (
        <p>Error verifying email. Please try again later.</p>
      )}
    </div>
  );
};

export default Verify;
