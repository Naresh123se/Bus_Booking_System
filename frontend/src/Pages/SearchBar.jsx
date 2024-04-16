import React, { useState, useEffect } from 'react';
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



const SearchBar = () => {
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
        const fromAutocomplete= new window.google.maps.places.Autocomplete(
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


    // Empty dependency arr

    //remove local storage
    return (
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

                    <div className='ml-2 pt-6  '>
                        <Button onClick={submitHandler}>Search</Button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default SearchBar