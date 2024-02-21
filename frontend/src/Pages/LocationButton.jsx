import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Location');
  };

  return (
    <button onClick={handleClick}>Go to Location</button>
  );
};

export default LocationButton;
