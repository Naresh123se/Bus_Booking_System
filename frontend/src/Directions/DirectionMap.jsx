import React, { useEffect, useState } from 'react';

const DirectionMap = () => {
  let map, directionsService, directionsRenderer;
  let sourceAutocomplete, destAutocomplete;

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 27.70, lng: 85.32 },
      zoom: 13
    });

    window.google.maps.event.addListener(map, "click", function (event) {
      map.setOptions({ scrollwheel: true });
    });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    sourceAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('source')
    );
    destAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('dest')
    );
  };

  const calcRoute = () => {
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value;

    let request = {
      origin: source,
      destination: dest,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        // Set directions on the map
        directionsRenderer.setDirections(result);

        // Display the estimated duration
        if (result.routes && result.routes.length > 0) {
          var route = result.routes[0];
          if (route.legs && route.legs.length > 0) {
            var duration = route.legs[0].duration.text;
            // Update your UI with the duration information
            updateDurationUI(duration);
          }
        }
      }
    });
  };

  const updateDurationUI = (duration) => {
    // Update your UI element with the estimated duration
    var durationElement = document.getElementById('duration');
    if (durationElement) {
      durationElement.textContent = 'Estimated Duration: ' + duration;
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
        <button className="btn btn-primary" onClick={calcRoute}>Direction</button>
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
      </div>
    </div>
  );
};

export default DirectionMap;
