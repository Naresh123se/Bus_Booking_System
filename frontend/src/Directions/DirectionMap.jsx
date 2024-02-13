import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const DirectionMap = () => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [destAutocomplete, setDestAutocomplete] = useState(null);
  const [sourceAutocomplete, setSourceAutocomplete] = useState(null);
  const [busMarkers, setBusMarkers] = useState([]);

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
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 27.70, lng: 85.32 },
      zoom: 13,
    });
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map: mapInstance }));
    setDestAutocomplete(new window.google.maps.places.Autocomplete(document.getElementById('dest')));
    setSourceAutocomplete(new window.google.maps.places.Autocomplete(document.getElementById('source')));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.setCenter(userLocation);
          new window.google.maps.Marker({
            position: userLocation,
            map: mapInstance,
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

  const calcRoute = () => {
    const source = document.getElementById('source').value;
    const dest = document.getElementById('dest').value;

    const placesService = new window.google.maps.places.PlacesService(map);
    placesService.findPlaceFromQuery(
      { query: dest, fields: ['place_id', 'geometry'] },
      (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const placeId = results[0].place_id;
          const destLocation = results[0].geometry.location;
          const request = {
            origin: source,
            destination: { placeId },
            travelMode: 'DRIVING',
          };

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              if (result.routes && result.routes.length > 0) {
                const route = result.routes[0];
                if (route.legs && route.legs.length > 0) {
                  const duration = route.legs[0].duration.text;
                  const distance = route.legs[0].distance.text;
                  updateDurationUI(duration, distance);
                  getPlaceDetails(placeId);
                  displayNearbyBusStop(destLocation);
                }
              }
            } else {
              console.error('Error calculating the route:', status);
            }
          });
        } else {
          console.error('Error fetching place details for destination:', status);
        }
      }
    );
  };

  const updateDurationUI = (duration, distance) => {
    document.getElementById('duration').textContent = 'Estimated Duration: ' + duration;
    document.getElementById('distance').textContent = 'Distance: ' + distance;
  };

  const displayNearbyBusStop = (destinationLocation) => {
    const request = {
      location: destinationLocation,
      radius: '500',
      type: 'transit_station' // bus stop
    };
    const placesService = new window.google.maps.places.PlacesService(map);
    placesService.nearbySearch(request, (results, status) => {
      if (status === 'OK') {
        clearHotelMarkers();
        const markers = results.map(place => {
          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
          });
          marker.addListener('click', () => {
            console.log('Bus clicked:', place.name);
          });
          return marker;
        });
        setBusMarkers(markers);
      } else {
        console.error('Error fetching nearby Bus:', status);
      }
    });
  };
  
  const clearHotelMarkers = () => {
    busMarkers.forEach(marker => marker.setMap(null));
    setBusMarkers([]);
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
          displayPhotos(place.photos,place.name);
        } else {
          console.error('Error fetching place details:', status);
        }
      }
    );
  };
  
  
  const displayPhotos = (photos,name) => {
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
      <p id="distance"></p>
      <div className="container">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Source" id="source" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Destination" id="dest" />
        </div>
        <Button style={{ backgroundColor: 'red' }} onClick={calcRoute}>
          Direction
        </Button>
        <div className='flex'>
          <div id="map" style={{ height: '500px', width: '100%' }}></div>


          <div id="photo-container" style={{ height: '500px', overflow: 'auto' }}>
  {/* Content goes here */}
</div>


        </div>
      </div>
    </div>
  );
};

export default DirectionMap;
