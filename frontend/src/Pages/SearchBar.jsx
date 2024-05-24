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


import 'react-datepicker/dist/react-datepicker.css';

import { useSearchMutation } from '../slices/booking';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/bSlice';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { useNavigate } from 'react-router-dom';

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
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [arrowDirection, setArrowDirection] = useState('right');
    const [selectedCountry, setSelectedCountry] = useState('in'); // Default to India

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
            navigate('/Location');
            console.log(res);
            setSearch1(res);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };


    const localDate = new Date();
    const formattedDate = localDate.toISOString().split('T')[0];
    const [value, setValue] = useState(formattedDate);
    const [value1, setValue1] = useState(formattedDate);

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

    return (
      <>

      <form onSubmit={submitHandler}>
            {/*radio button */}
            <div className='shadow-lg sm:ml-5 sm:w-full mt-4 sm:mt-10 md:ml-3 xl:ml-3 max-lg:ml-10 ml-24 pr-5 pl-5 sm:px-12 pb-5 pt-5 bg-[#ffffff] shadow-[#b7acac] rounded-xl grid'>
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

                {/* Location Inputs */}
                <div className='flex sm:grid ml-2'>
                    <div className='flex sm:grid md:grid xl:grid'>
                        <div className='flex sm:grid md:flex xl:flex'>
                            <div className='mt-4 sm:mt-1'>
                                <TextField
                                    label="FROM"
                                    id="fromLocation"
                                    sx={{ width: '5cm' }}
                                    placeholder='Enter From Location'
                                    required
                                    value={fromLocation}
                                    onChange={(e) => setFromLocation(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                                    }}
                                />
                            </div>

                            {/* switch button */}
                            <div className='mt-6 sm:mt-0 sm:ml-36'>
                                <button onClick={() => { switchLocations(); switchArrowDirection(); }}>
                                    <CompareArrowsRoundedIcon
                                        className='border w-30 h-30 border-sky-500 rounded-full hover:text-[#2d6280]'
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
                            <div className='mt-4 sm:mt-0'>
                                <TextField
                                    label="TO"
                                    id="toLocation"
                                    sx={{ width: '5cm' }}
                                    placeholder='Enter To Location'
                                    required
                                    value={toLocation}
                                    onChange={(e) => setToLocation(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                                    }}
                                />
                            </div>
                        </div>

                        <div className='flex md:grid xl:grid'>
                            {/* Departure */}
                            {/* calender */}
                            <div className="flex sm:grid ml-5 mt-2 sm:ml-0 md:ml-0 xl:ml-0">
                                <div className="ml-5 mt-2 sm:ml-0 md:ml-0 xl:ml-0">
                                    <TextField
                                        className={`w-[full] sm:w-[5cm] md:w-[5cm] lg:w-[5cm] xl:w-[5cm] ${selectedValue === "b" ? 'w-[5cm]' : 'w-[10.5cm] md:w-[10.5cm] xl:w-[10.5cm]'}`}
                                        type="date"
                                        name="calender"
                                        label="Departure"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        required
                                        inputProps={{ min: formattedDate }}
                                    />
                                </div>
                                {/*Return */}
                                <div className="datepicker-container ml-5 sm:ml-0 mt-2">
                                    {selectedValue === "b" && (
                                        <TextField
                                            sx={{ width: '5cm' }}
                                            type="date"
                                            name="calender"
                                            label="Return"
                                            value={value1}
                                            onChange={(e) => setValue1(e.target.value)}
                                            required
                                            inputProps={{ min: formattedDate }}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* passenger */}
                            <div className='mt-4 ml-7 sm:ml-0 md:ml-0 xl:ml-0'>
                                <Dropdown className='mt-4 ml-7'>
                                    <MenuButton>
                                        <TextField
                                            label="Passengers"
                                            id="people"
                                            sx={{ width: '5cm' }}
                                            placeholder='passenger'
                                            value={`${count} passenger${count > 1 ? "s" : ""} ${bike} bike${bike > 1 ? "s" : ""}`}
                                            onChange={(e) => setFromLocation(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="center">
                                                        <KeyboardArrowDownIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MenuButton>
                                    <Menu className='bg-[#bac0df] p-2 rounded-md'>
                                        <MenuItem onClick={''}>
                                            <div>
                                                Passengers
                                                <button className="btn" onClick={decrement}><RemoveCircleIcon /></button>
                                                <span id="count" className='text-xl rounded-md'>{count}</span>
                                                <button className="btn" onClick={increment}><AddCircleIcon /></button>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={''}>
                                            <div className='flex gap-10'>
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
                        </div>
                    </div>
                    <div className='ml-2 pt-6'>
                        <Button  type='submit'>Search</Button>
                    </div>
                </div>
            </div>
            </form>
            </>
    );
};

export default SearchBar;
