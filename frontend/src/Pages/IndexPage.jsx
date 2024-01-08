import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';


const LocationForm = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [arrowDirection, setArrowDirection] = useState('right');

  const switchLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };


  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const switchArrowDirection = () => {
    setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
  };

  return (
    <div>
        {/* image */}
        <div>
        <img src="bus.png" alt="bus" />
      </div>
{/*radio button */}
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
            sx={{ width: '25ch' }}
            placeholder='Pokhara'
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
            sx={{  width: '25ch' }}
            placeholder='Kathmandu'
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
            }}
          />

        </div>
        {/* Departure */}
<div className='mt-4 ml-20'>
          <TextField
            label="FROM"
            id="fromLocation"
            sx={{ width: '25ch' }}
            placeholder='Pokhara'
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                
                </InputAdornment>,
            }}
          />
        </div>
      </div>


{/* calender */}
<div className="border border-sky-500 rounded-md p-4 bg-bg1 ml-96 mt-5" style={{ width: "50%" }}>
  
</div>







    </div>
  );
};

export default LocationForm;
