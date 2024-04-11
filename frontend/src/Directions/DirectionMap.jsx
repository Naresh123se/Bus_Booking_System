import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import Button from '@mui/joy/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useSearchMutation } from '../slices/booking';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/bSlice';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { useNavigate } from 'react-router-dom'







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
    const setDestAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('toLocation'));
    const setSourceAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('fromLocation'));

    setDestAutocomplete.addListener('place_changed', () => {
      const place = setDestAutocomplete.getPlace();
      setToLocation(place.formatted_address);
    });

    setSourceAutocomplete.addListener('place_changed', () => {
      const place = setSourceAutocomplete.getPlace();
      setFromLocation(place.formatted_address);
    });

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
  const mapDiv = document.getElementById('map');
  const calcRoute = () => {
    const source = document.getElementById('fromLocation').value;
    const dest = document.getElementById('toLocation').value;
    mapDiv.style.height = '400px';
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

  // second
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search] = useSearchMutation();
  //hover user number
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };


  //hover user number
  const [bike, setBike] = useState(0);

  const add = () => {
    setBike(prevCount => prevCount + 1);
  };

  const sub = () => {
    if (bike > 0) {
      setBike(prevCount => prevCount - 1);
    }
  };
  //dropdown menu close open(user number)

  const [selectedValue, setSelectedValue] = React.useState('a');

  const today = new Date();


  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const [arrowDirection, setArrowDirection] = useState('right');

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const switchLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };

  const switchArrowDirection = () => {
    setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
  };


  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      event.target.blur(); // Remove focus from the text field
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await search({ fromLocation, toLocation, value, value1, bike, count }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/Booking');

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [value, setValue] = useState(new Date().toLocaleDateString('en-US'));
  const [value1, setValue1] = useState('');

  const handleChange1 = date => {
    setSelectedDate(date);
    // Format the date as needed
    const formattedDate = date ? formatDate(date) : '';
    setValue(formattedDate);
  };
  const handleChange11 = date => {
    setSelectedDate(date);
    // Format the date as needed
    const formattedDate = date ? formatDate(date) : '';
    setValue1(formattedDate);
  };

  const formatDate = date => {
    // Example: MM/dd/yyyy format
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
  };
  // local Storage
  useEffect(() => {
    const storedData = localStorage.getItem('search');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      //   setSelectedValue(parsedData.selectedValue);
      setFromLocation(parsedData.fromLocation);
      setToLocation(parsedData.toLocation);

      setValue(parsedData.value);
      //   setValue1(parsedData.value1 ? new Date(parsedData.value1) : null);
      setValue1(parsedData.value1);
      setCount(parsedData.count);
      setBike(parsedData.bike);
    }
  }, []);

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
          displayPhotos(place.photos, place.name);
        } else {
          console.error('Error fetching place details:', status);
        }
      }
    );
  };

  const displayPhotos = (photos, name) => {
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
      {/* <h1 className="text-center">Direction</h1> */}

      <div className='  shadow-lg ml-20 pl-5   mt-4  mr-16 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl  '>
        <div>
          <Radio

            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            id=''
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 28,
              },
            }}
          />
          One Way
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 28,
              },
            }}
          />

          Round Trip
        </div>


        {/* location */}
        <div className='flex ml-2' >
          <div className='mt-4'>
            <TextField
              label="FROM"
              id="fromLocation"
              sx={{ width: '5cm' }}
              placeholder='Enter From Location'
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
              }}
            />
          </div>

          {/* switch button */}
          <div className='mt-6'>
            <button onClick={() => { switchLocations(); switchArrowDirection(); }}>
              <CompareArrowsRoundedIcon
                className='border w-30 h-30 border-sky-500 rounded-full'
                sx={{
                  color: '#2196F3',
                  borderRadius: '50%',
                  transform: `rotate(${arrowDirection === 'right' ? '0deg' : '180deg'})`,
                  transition: 'transform 0.3s ease',
                  fontSize: 35,
                }}
              />
            </button>
          </div>

          {/* next location */}
          <div className='mt-4'>
            <TextField

              label="TO"
              id="toLocation"
              sx={{ width: '5cm' }}
              placeholder='EnterTo Location'
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}

              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
              }}
            />

          </div>
          {/* Departure */}


          {/* calender */}
          <div className=" flex  ml-5 mt-2" >


            <div className="datepicker-container ml-5 mt-2">

              <DatePicker

                label="Departure"
                value={value}
                minDate={today}

                onChange={handleChange1}
                className="border border-1"
                startAdornment={<CalendarTodayIcon />}
                customInput={
                  <TextField
                    sx={{ width: selectedValue === "b" ? ' 5cm' : '10.58cm' }}
                    label="Departure"
                    className="border border-1"
                    InputProps={{
                      endAdornment: <CalendarTodayIcon />,
                    }}
                  />
                }
              />

            </div>

            <div className="datepicker-container ml-5 mt-2 ">
              {selectedValue === "b" && (

                <DatePicker
                  value={value1}
                  minDate={today}
                  onChange={handleChange11}
                  className="border border-1"
                  startAdornment={<CalendarTodayIcon />}
                  customInput={
                    <TextField
                      sx={{ width: selectedValue === "b" ? ' 5cm' : '10.58cm' }}
                      label="Return"
                      className="border border-1"
                      InputProps={{
                        endAdornment: <CalendarTodayIcon />,
                      }}
                    />
                  }
                />
              )}
            </div>

          </div>
          <div className='mt-4 ml-7'>


            <Dropdown className='mt-4 ml-7 '>
              <MenuButton>
                <TextField
                  label="Passengers"
                  id="people"
                  sx={{ width: '5cm' }}
                  placeholder='passenger'

                  value={`${count} passenger${count > 1 ? "s" : ""} ${bike} bike${bike > 1 ? "s" : " "}`}
                  onChange={(e) => setFromLocation(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="center">

                        <KeyboardArrowDownIcon />
                      </InputAdornment>
                    ),
                  }}
                /></MenuButton>
              <Menu className='bg-[#424a73] p-2 rounded-md'>
                <MenuItem onClick={''}>
                  <div>
                    Passengers

                    <button className="btn" onClick={decrement}><RemoveCircleIcon /></button>
                    <span id="count" className='text-xl rounded-md '>{count}</span>
                    <button className="btn" onClick={increment}><AddCircleIcon /></button>


                  </div>
                </MenuItem>
                <MenuItem onClick={''}>

                  <div className='flex gap-10 ' >
                    Bikes
                    <div className='mb-2'>
                      <button className="btn" onClick={sub}><RemoveCircleIcon /></button>
                      <span id="count" className='text-xl rounded-md'>{bike}</span>
                      <button className="btn" onClick={add}><AddCircleIcon /></button>
                    </div>

                  </div>

                </MenuItem>
              </Menu>
            </Dropdown>
          </div>

          <div className='ml-4 pt-6  '>
            <Button style={{ padding: '10px' }} onClick={submitHandler}>Search</Button>
          </div>
          <div className='ml-5 pt-6 '>
            <Button style={{ backgroundColor: '#0756a6', padding: '10px ' }} onClick={calcRoute}>Direction</Button>
          </div>

        </div>


      </div>
      <div className='ml-20 rounded-lg mt-5 bg-[#E8EAED] w-80 pl-7  '>
        <p id="duration" class="text-blue  w-80 font-bold "></p>
        <p id="distance" class="text-green  w-80  text-xl"></p>
      </div>


      <div className="container">

      

        <div className='flex'>
          <div id="map" className='mt-5 ml-20' style={{ height: '460px', width: '90.5%' }}></div>


          <div id="photo-container" className='mt-5' style={{ height: '400px', overflow: 'auto' }}>
            {/* Content goes here */}
          </div>


        </div>
      </div>
    </div>
  );
};

export default DirectionMap;
