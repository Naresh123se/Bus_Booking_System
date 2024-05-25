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
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const DirectionMap = () => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [busMarkers, setBusMarkers] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('in'); // Default to India
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  useEffect(() => {
    loadGoogleMapsScript();
  }, [selectedCountry]);

  useEffect(() => {
    // Read user data from local storage
    const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
    const userData = JSON.parse(storedValue);

    // Check if user is logged in
    if (userData && userData.isLoggedIn) {
      // User is logged in, no action needed
      console.log("User is logged in");
    } else {
      // User is not logged in, show alert and navigate to login page
      console.log("User is not logged in");
      Swal.fire({
        position: "top-center",
        icon: "error",
        color: "#716add",
        background: "#00000 url(ll.png)",
        title: "Login First",
        showConfirmButton: true,
        backdrop: `
          rgba(10,0,123,0.4)
          left top
          no-repeat
        `
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Navigate to login page
        }
      });
    }

    // Check user status
    if (userData && !userData.status) {
      // User status is false, show another message
      console.log("Contact admin");
      Swal.fire({
        position: "top-center",
        icon: "error",
        color: "#716add",
        background: "#00000 url(ll.png)",
        title: "Contact Admin",
        text: "Your status is not active. Please contact admin for assistance.",
        showConfirmButton: true,
        backdrop: `
          rgba(10,0,123,0.4)
          left top
          no-repeat
        `
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); // Navigate to login page
        }
      });
    }
  }, []);


  const switchLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };

  const switchArrowDirection = () => {
    setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
  };

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
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

    const fromAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('fromLocation'),
      { componentRestrictions: { country: selectedCountry } }
    );
    const toAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('toLocation'),
      { componentRestrictions: { country: selectedCountry } }
    );

    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      setFromLocation(place.formatted_address);
    });

    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      setToLocation(place.formatted_address);
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
    mapDiv.style.height = '460px';
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
              } else {
                // If no routes found, show error message
                console.log("first")
                toast.error('No bus routes found for the selected locations.');
              }
            } else {
              toast.error('No bus routes found for the selected locations.');

              console.error('Error calculating the route:', status);
            }
          });
        } else {
          toast.error('No bus routes found for the selected locations.');

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
  const [arrowDirection, setArrowDirection] = useState('right');
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
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

  const localDate = new Date();
  const formattedDate = localDate.toISOString().split('T')[0];
  const [value, setValue] = useState(formattedDate);
  const [value1, setValue1] = useState(formattedDate);


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
      setFromLocation(parsedData.fromLocation);
      setToLocation(parsedData.toLocation);
      setValue(parsedData.value);
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
    <>
      <form onSubmit={submitHandler}>
        <div className='  shadow-lg ml-20 pl-5   mt-4  mr-16 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl  '>
          <div className='flex sm:grid sm:w-full'>
            <div className='flex items-center'>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <p className='sm:text-[14px]'>One Way</p>
            </div>
            <div className='flex items-center'>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'B' }}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <p className='sm:text-[14px]'>Round Trip</p>
            </div>

            {/* Country Selection */}
            <div className=' mt-2 ml-5 border rounded-md p-0.5 border-[#c2bcbc]'>
              <label htmlFor="country">Select Country: </label>
              <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="in">India</option>
                <option value="np">Nepal</option>
              </select>
            </div>
          </div>

          {/* location */}
          <div className='flex ml-2' >
            <div className='mt-4'>
              <TextField
                label="FROM"
                id="fromLocation"
                required
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
                required
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
              <div className="ml-5 mt-2">
                <TextField
                  sx={{ width: selectedValue === "b" ? ' 5cm' : '10.5cm' }}
                  type="date"
                  name="calender"
                  label="Departure"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className=" border border-[#e6e3e3]   rounded-md"
                  inputProps={{ min: formattedDate }} />
              </div>

              <div className="datepicker-container ml-5 mt-2 ">
                {selectedValue === "b" && (
                  <TextField
                    sx={{ width: '5cm' }}
                    type="date"
                    name="calender"
                    label="Return"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    className=" border border-[#e6e3e3]   rounded-md"
                    inputProps={{ min: formattedDate }} />
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
              <Button style={{ padding: '10px' }} type='submit'>Search</Button>
            </div>
            <div className='ml-5 pt-6 '>
              <Button style={{ backgroundColor: '#0756a6', padding: '10px ' }} onClick={calcRoute}>Direction</Button>
            </div>
          </div>
        </div>
        <div className='ml-64  mt-[31px] bg-[white]  absolute  z-10 gap-2  p-2 flex '>
          |<p id="duration" class=""></p> |
          <p id="distance" class=""></p>
        </div>

        <div className="container ">
          <div className='flex'>
            <div id="map" className='mt-5 ml-20' style={{ height: '460px', width: '90.5%' }}></div>
            <div id="photo-container" className='mt-5' style={{ height: '460px', overflow: 'auto' }}>
              {/* Content goes here */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DirectionMap;
