import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('otherToken');

  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false); // State to track if a request is in progress

  useEffect(() => {
    if (!userId || isRequesting) return; // Exit if userId is not defined or a request is already in progress

    setIsRequesting(true); // Set isRequesting to true to indicate that a request is starting

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify?otherToken=${userId}`);
        const data = response.data;

        if (data.success) {
          if (data.verificationStatus === 'success') {
            setVerificationStatus('success');
            alert('Email verified successfully');
            window.location.href = '/login'; 

          } else if (data.verificationStatus === 'alreadyVerified') {
            setVerificationStatus('alreadyVerified');
            alert('Email is already verified');
            window.location.href = '/login'; // Redirect to the login page
          }
        } else {
          setVerificationStatus('error');
          alert('Error verifying email. Please try again later.');
            window.location.href = '/';
        }

      } catch (error) {
        console.error('Error:', error);
        setVerificationStatus('error');
      } finally {
        setIsRequesting(false); // Set isRequesting to false after the request is completed (whether it succeeds or fails)
      }
    };

    verifyEmail();
  }, [userId, isRequesting]);

  return (
    <></>
  );
};

export default Verify;
