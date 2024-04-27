import React, { useState, useEffect } from 'react';
import Mobile from '../Directions/Mobile.jsx'
import AllFilter from '../Booking/AllFilter.jsx'


import { useSelseatMutation, useGetseatMutation } from '../slices/seat';
import { useGetScheduleMutation } from '../slices/busSchedules.js';
import { faDivide } from '@fortawesome/free-solid-svg-icons';
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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MuiInput from '@mui/material/Input';



import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

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
  const [showData, setShowData] = useState(false);
  const [Getseat] = useGetseatMutation();
  const toggleVisibility = () => {
    setShowData(!showData);
  };
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
      const seatData = response.data.data; // Assuming this contains the array of seat objects
      console.log(response)
      // Extract seseats arrays from each seat object and concatenate them into a single array
      const seseats = seatData.reduce((accumulator, seat) => {
        return accumulator.concat(seat.seseats);
      }, []);

      const seatId = localStorage.getItem('scheduleId');
      const filteredSeats = seatData.filter(seat => seat.schedule === seatId);

      console.log(filteredSeats);

      setSfilter(seatData)
      // Extract selected seats from filteredSeats
      const selectedSeats = filteredSeats.reduce((accumulator, seat) => {
        return accumulator.concat(seat.seseats);
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
      const scheduleId = entry.schedule;
      const seatCount = entry.seseats.length;
      if (scheduleSeatCounts[scheduleId]) {
        scheduleSeatCounts[scheduleId] += seatCount;
      } else {
        scheduleSeatCounts[scheduleId] = seatCount;
      }
    }
    return scheduleSeatCounts;
  }
  const scheduleSeatCounts = getScheduleSeatCounts(Filter);
  // console.log('Schedule Seat Counts:', scheduleSeatCounts);



  // time
  const time = { hour: 'numeric', hour12: false }
  const Time = currentTime.toLocaleTimeString(undefined, time);

  const time2 = new Date(currentTime);
  time2.setTime(time2.getTime() + (1 * 60 * 60 * 1000));
  const two = time2.toLocaleTimeString(undefined, time);





  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const [showData1, setShowData1] = useState(false);

  const toggleVisibility1 = () => {
    setShowData(!showData);
  };


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
      document.getElementById('fromLocation')
    );
    const toAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('toLocation')
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

  const [startTime, setStartTime] = useState('');
  const book = (id, startTime, price, endTime, capacity) => {
    localStorage.setItem("scheduleId", id);
    localStorage.setItem("price", price);
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("capacity", capacity);

    navigate('/seat');
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

  const [placeFilter, setPlaceFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);

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




  const [isVisible, setIsVisible] = useState(false);
  const toggleDiv = (itemId) => {
    console.log(itemId)
    console.log("first")
    setOpenItemId(itemId === openItemId ? null : itemId);
  };

  //filter
  



  

  return (
    <>
      <div className='m-10   '>
        <div>
          {/*radio button */}
          <div className='  shadow-lg ml-24  mt-4   pr-5 pl-5 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl   '>
            <div>
              <Radio

                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
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


        <div className='overflow-y-scroll  h-[58vh] p-5 '>
          <div>
            {loading ? (
              // Show loader while waiting for data
              <Mobile />
            ) : (
              // Show data or no data message based on availability
              <div>
                {data.length > 0 ? (
                  <>
                    <AllFilter />




                  </>
                ) : (

                  <div className='grid  justify-center mt-10'>
                    <div className='ml-5' > <img src="Seat.svg" alt="logo" /></div>
                    <div className=''>
                      <p className='font-bold text-[20px] '>Oops! No buses found.</p>
                      <p className='ml-5'>Oops! No buses found.</p>

                    </div>
                  </div>

                )}
              </div>
            )}
            {/* {  console.log(data)} */}
          </div>

          {data.map((item, index) => (

            <div key={index} className='ml-64 mr-[248px] pb-5 border-[1px] border-[#C8C8C8] shadow-[#b7acac] rounded-md mb-4'>
              <div className='flex  mr-10 ml-10 justify-between p-1'>

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


                {/* <div> {item.bus.capacity}</div> */}
                {/* Display bus name */}

                <div className='ml-10'>
                  <span className=' border rounded-md border-[#909090] p-0.5  '>
                    <span className=''> <Groups2Icon sx={{ color: '#475362' }} /> Seats available </span>
                    {/* seat available */}
                    <span className='font-semibold'>



                      {scheduleSeatCounts[item._id] === undefined ? 'FULL' : item.bus.capacity - scheduleSeatCounts[item._id]
                      }
                    </span>
                  </span>
                </div>
              </div>
              <div>
              </div>

              <div className='ml-[50%]'>
                <button className='ml-[77%] bg-[#41b5f7] p-1.5 text-[white] rounded-md mr-6 pl-3 hover:bg-[#185EA5]' variant="contained" onClick={() => book(item._id, item.startTime, item.price, item.endTime, item.bus.capacity)}>
                  <strong>Continue</strong>
                </button>
              </div>

              {/* bus photos */}
              <div>
                <button className='cursor-pointer shadow hover:text-[#009DF8]  ml-40 ' onClick={() => toggleDiv(item._id)}>
                  BusPhotos
                </button>


                {openItemId === item._id && (
                  <div>
                    <div className=''>
                      <div className=' w-[80vh] px-7 bg mt-5  '>

                        {/* <h2 className="text-xl font-semibold mb-4 ml-16">Trending Offers for Discount Coupons</h2> */}
                        <Slider {...settings} className="mr-44">
                          {data.map((item1) => (
                            item.bus.selectedImages.map((image, index) => (
                              <div key={index} className='flex h-60 p p-1 bg-[#185EA5] rounded-md'>
                                <div className="w-full" style={{ fontSize: '1.2rem', color: '#555' }}>
                                  <img src={image.url} alt="Image" style={{ color: '#555', height: '31vh', width: '100%', }} className='object-cover object-center' />
                                </div>
                              </div>
                            ))
                          ))}
                        </Slider>


                      </div>
                    </div>




                  </div>
                )}
              </div>





              {/* DOWN */}
              <div className='  '>
              </div>

            </div>
          ))}

        </div>



      </body>
    </>
  )
}

export default Booking



