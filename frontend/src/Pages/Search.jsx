import React from 'react'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Search = () => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [arrowDirection, setArrowDirection] = useState('right');

    const [destAutocomplete, setDestAutocomplete] = useState(null);
    const [sourceAutocomplete, setSourceAutocomplete] = useState(null);
    const [map, setMap] = useState(null);

    const switchLocations = () => {
        const tempLocation = fromLocation;
        setFromLocation(toLocation);
        setToLocation(tempLocation);
    };

    const switchArrowDirection = () => {
        setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
    };

    //////////////////////////////////////////////

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


        setDestAutocomplete(new window.google.maps.places.Autocomplete(document.getElementById('fromLocation')));
        setSourceAutocomplete(new window.google.maps.places.Autocomplete(document.getElementById('toLocation')));

    };
    return (
        <>
            <div className='mt-4'>
                <TextField
                    label="FROM"
                    id="fromLocation"
                    sx={{ width: '5cm' }}
                    placeholder='Pokhara'

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
                    placeholder='Kathmandu'

                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                    }}
                />

            </div>
            <div>
                <div id="map" />
            </div>
        </>
    )
}

export default Search