import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <div>
      Latitude: {latitude}<br />
      Longitude: {longitude}
    </div>
  );
};

export default LocationTracker;
