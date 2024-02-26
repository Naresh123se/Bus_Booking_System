import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const LocationPicker = () => {
  const [origin, setOrigin] = useState({ lat: null, lng: null });
  const [originCity, setOriginCity] = useState('');
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [destinationCity, setDestinationCity] = useState('');
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (origin.lat !== null && origin.lng !== null) {
      fetchCityName(origin.lat, origin.lng, setOriginCity);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.lat !== null && destination.lng !== null) {
      fetchCityName(destination.lat, destination.lng, setDestinationCity);
    }
  }, [destination]);

  const handleMapClick = ({ lat, lng }) => {
    if (!origin.lat || !origin.lng) {
      setOrigin({ lat, lng });
    } else if (!destination.lat || !destination.lng) {
      setDestination({ lat, lng });
    } else {
      // Both origin and destination are already selected, reset and set new origin
      setOrigin({ lat, lng });
      setDestination({ lat: null, lng: null });
      setRoute(null);
    }
  };

  const fetchCityName = (lat, lng, setCity) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(lat, lng);
    
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const cityComponent = results[0].address_components.find(component => {
            return component.types.includes('locality');
          });
          if (cityComponent) {
            setCity(cityComponent.long_name);
          }
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  useEffect(() => {
    if (origin.lat && origin.lng && destination.lat && destination.lng) {
      calculateRoute();
    }
  }, [origin, destination]);

  const calculateRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const originLatLng = new window.google.maps.LatLng(origin.lat, origin.lng);
    const destinationLatLng = new window.google.maps.LatLng(destination.lat, destination.lng);
    const request = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        setRoute(result);
      } else {
        console.error('Error calculating route:', status);
      }
    });
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDXMysFoIH3bi9TKU6uBHqFimln-vYCFQg' }} // Replace YOUR_API_KEY with your Google Maps API key
        defaultCenter={{ lat: 27.70, lng: 85.32 }}
        defaultZoom={13}
        onClick={handleMapClick}
      >
        {origin.lat && origin.lng && (
          <Marker
            lat={origin.lat}
            lng={origin.lng}
            text="Origin"
          />
        )}
        {destination.lat && destination.lng && (
          <Marker
            lat={destination.lat}
            lng={destination.lng}
            text="Destination"
          />
        )}
        {route && (
          <DirectionsRenderer
            directions={route}
          />
        )}
      </GoogleMapReact>
      <div>
        <div>
          <strong>Origin:</strong> City: {originCity}
        </div>
        <div>
          <strong>Destination:</strong> City: {destinationCity}
        </div>
      </div>
    </div>
  );
};

const Marker = ({ text }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '50%',
        padding: '5px',
      }}
    >
      {text}
    </div>
  );
};

const DirectionsRenderer = ({ directions }) => {
  const renderRoute = () => {
    const route = directions.routes[0];
    return (
      <div>
        <p>Distance: {route.legs[0].distance.text}</p>
        <p>Duration: {route.legs[0].duration.text}</p>
        <ol>
          {route.legs[0].steps.map((step, index) => (
            <li key={index}>{step.instructions}</li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      {renderRoute()}
    </div>
  );
};

export default LocationPicker;
