import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

const DirectionMap = () => {
  let map, directionsService, directionsRenderer, destAutocomplete, sourceAutocomplete;


  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDXMysFoIH3bi9TKU6uBHqFimln-vYCFQg&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  
  const initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 27.70, lng: 85.32 },
      zoom: 13,
    });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    destAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('dest'));
    sourceAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('source'));
   
    // Get the user's current location and display it on the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);

          // Add a marker at the user's current location
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  
  const calcRoute1 = () => {
    const source = document.getElementById('source').value;
    const dest = document.getElementById('dest').value;
  
    // Use Places API to get place details and extract placeId for the destination
    const placesService = new window.google.maps.places.PlacesService(map);
    placesService.findPlaceFromQuery(
      { query: dest, fields: ['place_id'] },
      (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const placeId = results[0].place_id;
  
          // Now use the obtained placeId for the directions request
          let request = {
            origin: source,
            destination: { placeId },
            travelMode: 'DRIVING',
          };
  
          directionsService.route(request, function (result, status) {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
  
              if (result.routes && result.routes.length > 0) {
                const route = result.routes[0];
                if (route.legs && route.legs.length > 0) {
                  const duration = route.legs[0].duration.text;
                  updateDurationUI(duration);
  
                  // Get place details, including photos, for the specified destination
                  getPlaceDetails(placeId);
                }
              }
            }
          });
        } else {
          console.error('Error fetching place details for destination:', status);
        }
      }
    );
  };
  
  const updateDurationUI = (duration) => {
    const durationElement = document.getElementById('duration');
    if (durationElement) {
      durationElement.textContent = 'Estimated Duration: ' + duration;
    }
  };
  
  const getPlaceDetails = (dest) => {
    const service = new window.google.maps.places.PlacesService(map);
  
    service.getDetails(
      {
        placeId: dest,
        fields: ['name', 'photos'],
      },
      (place, status) => {
        if (status === 'OK' && place && place.photos && place.photos.length > 0) {
          // Display all photos
          displayPhotos(place.photos);
        } else {
          console.error('Error fetching place details:', status);
        }
      }
    );
  };
  
  
  

  const displayPhotos = (photos) => {
    const photoContainer = document.getElementById('photo-container');
    if (photoContainer) {
      // Clear existing content
      photoContainer.innerHTML = '';
  
      // Display each photo
      photos.forEach((photo) => {
        const photoUrl = photo.getUrl();
        const imgElement = document.createElement('img');
        imgElement.src = photoUrl;
        imgElement.alt = 'Location Photo';
        imgElement.style.width = '150px';
        imgElement.height = 100;// Fix: Remove the space before the semicolon
        photoContainer.appendChild(imgElement);
        
      });
    }
  };
  
  
  return (
    <div>
      <h1 className="text-center">Direction</h1>
      <p id="duration"></p>
      <div className="container">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Source" id="source" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Destination" id="dest" />
        </div>
        <Button style={{ backgroundColor: 'red' }} onClick={calcRoute1}>
          Direction
        </Button>
      <div className='flex'>
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
        <div id="photo-container"></div>
        </div>
      </div>
    </div>
  );
  };
  
  export default DirectionMap;
  