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
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';




const SearchBar = () => {







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
    //SEARCH


    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [arrowDirection, setArrowDirection] = useState('right');
    const [value, setValue] = React.useState(dayjs());
    useEffect(() => {
        loadGoogleMapsScript();
    }, []);

    const switchLocations = () => {
        const tempFromLocation = fromLocation;
        const tempToLocation = toLocation;

        setFromLocation(tempToLocation);
        setToLocation(tempFromLocation);
    };

    const switchArrowDirection = () => {
        const newDirection = arrowDirection === 'right' ? 'left' : 'right';
        setArrowDirection(newDirection);
    };

    const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDXMysFoIH3bi9TKU6uBHqFimln-vYCFQg&libraries=places`;
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


   

    const today = dayjs();


    return (
        <div>
            {/*radio button */}
            <div className='  shadow-lg ml-10     pr-5 pl-5 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl   '>
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
                            placeholder='Enter To Location'
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

                        <div >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: selectedValue === "b" ? ' 5cm' : '10.58cm' }}
                                        label="Departure"
                                        value={value}
                                        minDate={today}
                                        disablePast
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className=''>
                            {selectedValue === "b" && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            sx={{ width: "5cm" }}
                                            label="Return"
                                            value={value}
                                            minDate={today}
                                            disablePast
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                                    placeholder='Pokhara'
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


                        <Button>Search</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SearchBar