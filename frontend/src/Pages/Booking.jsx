import React, { useState, useEffect } from 'react';
import Skeleton from '../Directions/Skeleton.jsx'

import AllFilter from '../Booking/AllFilter.jsx'
import Extra from '../Booking/Extra.jsx'



import { useGetScheduleMutation } from '../slices/busSchedules.js';

import Groups2Icon from '@mui/icons-material/Groups2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import Button1 from '@mui/joy/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from 'dayjs';

import Swal from 'sweetalert2';




import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

import 'react-datepicker/dist/react-datepicker.css';

import { useSearchMutation } from '../slices/booking';
import { useGetTicketMutation } from '../slices/ticket';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/bSlice';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { useNavigate } from 'react-router-dom'
import PowerIcon from '@mui/icons-material/Power';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Booking = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [getSchedule] = useGetScheduleMutation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('in'); // Default to India

  const [Getseat] = useGetTicketMutation();
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedBusTypes, setSelectedBusTypes] = useState([]);

  const timeSlots = [
    { label: '1:00 - 6:00', value: '1-6' },
    { label: '6:00 - 12:00', value: '6-12' },
    { label: '12:00 - 18:00', value: '12-18' },
    { label: '18:00 - 24:00', value: '18-24' },
  ];
  const busTypes = ['Delax', 'Super', 'Rapti', 'Baba'];



  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchSeats();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount

  }, []);

  const [seseatsArray, setSeseatsArray] = useState([]);
  const [Filter, setSfilter] = useState([]);
  const fetchSeats = async () => {
    try {
      const response = await Getseat();
      const seatData = response.data.tickets; // Assuming this contains the array of seat objects
      console.log(response)
      // Extract seseats arrays from each seat object and concatenate them into a single array
      const seseats = seatData.reduce((accumulator, seat) => {
        return accumulator.concat(seat.seseats);
      }, []);

      const seatId = localStorage.getItem('scheduleId');
      const filteredSeats = seatData.filter(seat => seat.SchId._id === seatId);

      console.log(filteredSeats);

      setSfilter(seatData)
      // Extract selected seats from filteredSeats
      const selectedSeats = filteredSeats.reduce((accumulator, seat) => {
        return accumulator.concat(seat.seat);
      }, []);

      // Update seseatsArray state with the selected seats
      setSeseatsArray(selectedSeats);

      console.log(selectedSeats); // Output: Selected seats
    } catch (error) {
      console.error('Error fetching seat data:', error);
      setError(error.message);
    }
  };




  function getScheduleSeatCounts(Filter) {
    const scheduleSeatCounts = {};
    for (const entry of Filter) {
      const scheduleId = entry.SchId._id;
      console.log(scheduleId)
      const seatCount = entry.seat.length;
      console.log(seatCount)
      if (scheduleSeatCounts[scheduleId]) {
        scheduleSeatCounts[scheduleId] += seatCount;
      } else {
        scheduleSeatCounts[scheduleId] = seatCount;
      }
    }
    return scheduleSeatCounts;
  }
  const scheduleSeatCounts = getScheduleSeatCounts(Filter);
  // console.log(scheduleSeatCounts);



  // time



  const time2 = new Date(currentTime);
  time2.setTime(time2.getTime() + (1 * 60 * 60 * 1000));






  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);





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




  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');



  const [arrowDirection, setArrowDirection] = useState('right');


  useEffect(() => {
    loadGoogleMapsScript();
  }, [selectedCountry]);

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
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  };

  const initAutocomplete = () => {
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

    // Handle Enter key press for searching places
    document.getElementById('fromLocation').addEventListener('keydown', handleEnterKeyPress);
    document.getElementById('toLocation').addEventListener('keydown', handleEnterKeyPress);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      event.target.blur(); // Remove focus from the text field
    }
  };


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

  const submitData = async (e) => {


    try {

      const res = await search({ fromLocation, toLocation, value, value1, bike, count }).unwrap();
      dispatch(setCredentials({ ...res }));


    } catch (err) {
      toast.error(err?.data?.message || err.error);

    }

  };


  const book = (id, startTime, price, endTime, capacity, name1, number) => {
    localStorage.setItem("scheduleId", id);
    localStorage.setItem("price", price);
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("endTime", endTime);

    localStorage.setItem("capacity", capacity);
    localStorage.setItem("BusName1", name1);
    localStorage.setItem("BusNumber1", number);

    navigate('/seat')

    authenticateUser();
    return 0


  }




  const [selectedDate, setSelectedDate] = useState(dayjs());

  const localDate = new Date();
  const formattedDate = localDate.toISOString().split('T')[0];
  const [value, setValue] = useState(formattedDate);
  const [value11, setValue11] = useState(formattedDate);

  const [value1, setValue1] = useState('');
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


  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!fromLocation) return; // Add a check for empty fromLocation to avoid unnecessary API calls
        const result = await getSchedule();
        console.log(result);
        const startLocation = fromLocation.replace(', Nepal', '').replace('44600', '').trim();
        const placeFilter = result.data.data.filter(item => (item.startLocation.toLowerCase()) === startLocation.toLowerCase());
        const dateFilter = placeFilter.filter(item => item.calender === value);

        setData(dateFilter);
        setLoading(false);

      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    submitData();
    fetchSchedules();
  }, [fromLocation, value]);


  const [openItemId, setOpenItemId] = useState(null);



  //bus photos
  const CustomNextArrow = ({ onClick }) => (
    <button style={{ color: "red", background: '#009DF8' }} className="slick-next custom-next-arrow  rounded  " onClick={onClick}>

    </button>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <button style={{ background: '#009DF8' }} className="slick-arrow slick-prev custom-prev-arrow rounded  " onClick={onClick}>
      Previous
    </button>
  );

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };



  const toggleDiv = (itemId) => {
    console.log(itemId)
    console.log("first")
    setOpenItemId(itemId === openItemId ? null : itemId);
  };

  //filter

  // 
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') setIsLoggedIn(true);
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    history.push('/next-page');
  };



  useEffect(() => {
    // Function to authenticate user
    function authenticateUser(email, name) {
      // Get user data from localStorage
      const userDataString = localStorage.getItem('userInfo');
      if (!userDataString) {
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
            navigate('/login') // Redirect to the home page
          }
        });



        return false;
      }

      // Parse user data from localStorage
      const userData = JSON.parse(userDataString);

      // Check if email and name match
      if (userData.email === email && userData.name === name) {
        // Email and name match, return true (authentication successful)
        return true;
      } else {
        // Email and name do not match, return false (authentication failed)
        return false;
      }
    }

    // Example usage
    const userEmail = "naresh132na@gmail.com";
    const userName = "Naresh Sejwal1";

    if (authenticateUser(userEmail, userName)) {
      navigate('/Booking');

    } else {
      navigate('/Booking');
    }
  }, []);




  const handleTimeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTimes((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );
  };

  const handleBusTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBusTypes((prev) =>
      checked ? [...prev, value] : prev.filter((bt) => bt !== value)
    );
  }

  const applyFilters = () => {
    return data.filter((bus) => {
      const busTime = parseInt(bus.startTime.split(':')[0]);
      const isTimeMatch =
        selectedTimes.length === 0 ||
        selectedTimes.some((time) => {
          const [start, end] = time.split('-').map(Number);
          return busTime >= start && busTime < end;
        });
      const isTypeMatch =
        selectedBusTypes.length === 0 || selectedBusTypes.includes(bus.bus.name1);
      return isTimeMatch && isTypeMatch;
    });
  };

  const filteredBuses = applyFilters();


  return (
    <>
      <div className='m-10   '>
        <div>
          {/*radio button */}
          <div className='  shadow-lg ml-24  mt-4   pr-5 pl-5 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl   '>
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

              <div>

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
                  <Menu className='bg-[#70b8e1] w-48 p-1  rounded-md'>
                    <MenuItem onClick={''}>
                      <div className='ml-3'>
                        Passengers

                        <button className="btn ml-5" onClick={decrement}><RemoveCircleIcon sx={{ color: '#009DF8' }} /></button>
                        <span id="count" className='text-xl rounded-md '>{count}</span>
                        <button className="btn" onClick={increment}><AddCircleIcon sx={{ color: '#009DF8' }} /></button>


                      </div>
                    </MenuItem>
                    <MenuItem onClick={''}>

                      <div className='flex gap-10 ml-3 ' >
                        Bikes
                        <div className='mb-2 ml-5'>
                          <button className="btn" onClick={sub}><RemoveCircleIcon sx={{ color: '#009DF8' }} /></button>
                          <span id="count" className='text-xl rounded-md'>{bike}</span>
                          <button className="btn" onClick={add}><AddCircleIcon sx={{ color: '#009DF8' }} /></button>
                        </div>

                      </div>

                    </MenuItem>
                  </Menu>
                </Dropdown>
              </div>

              <div className='ml-10 pt-6  '>
                <Button1 onClick={submitHandler}>Search</Button1>
              </div>

            </div>


          </div>

        </div>
      </div>

      <body className='bg-[#F7F7F7]  '>


        <div className="flex overflow-y-scroll h-[58vh] p-5">
          <div className=" p-6 ml-10">
            <h3 className="text-sm font-bold mb-2">DEPARTURE TIME</h3>
            {timeSlots.map((slot) => (
              <div key={slot.value}>
                <input
                  type="checkbox"
                  id={slot.value}
                  value={slot.value}
                  onChange={handleTimeChange}
                  className="mr-2"
                />
                <label htmlFor={slot.value}>{slot.label}</label>
              </div>
            ))}

            <h3 className="text-sm font-bold mb-2 mt-6">BUS NAME</h3>
            {busTypes.map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  onChange={handleBusTypeChange}
                  className="mr-2"
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>

          <div className="w-[84%] ml-5 overflow-y-scroll">
            {loading ? (
              <Skeleton />
            ) : (
              <div>
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((item, index) => (
                    <div
                      key={index}
                      className="mx-10 pb-5 border border-[#C8C8C8] shadow rounded-md mb-4"
                    >
                        <div className='flex  mr-10 ml-10 justify-between p-1'>
                {/* {console.log(item._id)} */}
                <div className='text-xl font-semibold mr-40'> {item.bus.name1}</div>

                <div className='font-semibold text-xl'>{item.startTime}</div>
                <hr className=" flex-1 ml-1 mr-1  mt-3   h-border border-[#b6b3b3]" />
                <p>{(item.startTime)}</p>
                <hr className=" flex-1 ml-1 mr-1  mt-3   h-border border-[#b6b3b3]" />
                <div className='mr-40 font-semibold text-xl'>{item.endTime}</div>
                <div className='font-semibold text-xl'>{item.price}</div>
              </div>



<div className='ml-10 mb-3  flex  mt-3'>
                      <div>
                  <span className='  border-[#b5b1b1] border rounded-lg  '>
                    <span className='   '><DirectionsBusIcon sx={{ color: '#757575' }} /></span>
                    <span className='   '><PowerIcon sx={{ color: '#757575' }} /> </span>
                    <span className='   '></span>
                    <span className='  '><PhotoCameraFrontIcon sx={{ color: '#757575' }} /></span>
                  </span>
                </div>
                <div className='ml-28 text-lg'>{item.startLocation}</div>
                <div className='ml-[46vh] text-lg'>{item.endLocation}</div>

                        <div className='ml-10'>
                  <span className=' border rounded-md border-[#909090] p-0.5  '>
                    <span className=''> <Groups2Icon sx={{ color: '#475362' }} /> Seats available </span>
                    {/* seat available */}
                    <span className='font-semibold'>
                      {console.log(item.bus.capacity)}
                      {console.log(scheduleSeatCounts)}
                      {console.log(item._id)}
                      {console.log(scheduleSeatCounts[item._id])}


                      {scheduleSeatCounts[item._id] === undefined ? 'FULL' : item.bus.capacity - scheduleSeatCounts[item._id]
                      }
                    </span>
                  </span>
                </div>
                      </div>
{/* button */}
                      <div className='ml-[50%]'>
                <button className='ml-[77%] bg-[#41b5f7] p-1.5 text-[white] rounded-md mr-6 pl-3 hover:bg-[#185EA5]' variant="contained" onClick={() => book(item._id, item.startTime, item.price, item.endTime, item.bus.capacity,item.bus.name1,item.bus.number )}>
                  <strong>Continue</strong>
                </button>
              </div>
                        {/* bus photos */}
            
                        <div>
  <button
    className='cursor-pointer shadow hover:text-[#009DF8] ml-40'
    onClick={() => toggleDiv(item._id)}
  >
    BusPhotos
  </button>
  {openItemId === item._id && (
    <div className='ml-72'>
      <div className='w-[80vh] px-7 bg mt-5 '>
      <Slider {...settings} className="mr-44">
  {
    item.bus.selectedImages.map((image, index) => (
      <div key={index} className='flex h-60 p-1 bg-[#e7e7e8] rounded-md'>
        <div className="w-full" style={{ fontSize: '1.2rem', color: '#555' }}>
          <img
            src={image.url}
            alt="Bus"
            style={{ color: '#555', height: '31.5vh', width: '100%' }}
            className='object-contain'
          />
        </div>
      </div>
    ))
  }
</Slider>

      </div>
    </div>
  )}
</div>

                    </div>
                  ))
                ) : (
                  <div className="grid justify-center mt-10">
                    <div className="ml-5">
                      <img src="Seat.svg" alt="logo" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">Oops! No buses found.</p>
                      <p className="ml-5">Oops! No buses found.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>



      </body>
    </>
  )
}

export default Booking



