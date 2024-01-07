import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';

const LocationForm = () => {
  const [fromLocation, setFromLocation] = React.useState('');
  const [toLocation, setToLocation] = React.useState('');
  const [arrowDirection, setArrowDirection] = React.useState('right'); // Initial direction

  const switchLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };

  const handleArrowClick = () => {
    // Toggle arrow direction
    setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
    // Add any additional logic you need when the arrow is clicked
  };

  return (
    <div>
      <div className='mt-4'>
        <TextField
          label="FROM"
          id="fromLocation"
          sx={{ m: 1, width: '25ch' }}
          placeholder='Enter From Location'
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CompareArrowsRoundedIcon
                  sx={{
                    color: '#2196F3',
                    borderRadius: '50%',
                    transform: `rotate(${arrowDirection === 'right' ? '0deg' : '180deg'})`,
                  }}
                  onClick={handleArrowClick}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className='mt-4'>
        <TextField
          label="TO"
          id="toLocation"
          sx={{ m: 1, width: '25ch' }}
          placeholder='Enter To Location'
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CompareArrowsRoundedIcon
                  sx={{
                    color: '#2196F3',
                    borderRadius: '50%',
                    transform: `rotate(${arrowDirection === 'right' ? '0deg' : '180deg'})`,
                  }}
                  onClick={handleArrowClick}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className='mt-4'>
        <button onClick={switchLocations}>
          <CompareArrowsRoundedIcon
            sx={{
              color: '#2196F3',
              borderRadius: '50%',
              transform: `rotate(${arrowDirection === 'right' ? '0deg' : '180deg'})`,
            }}
            onClick={handleArrowClick}
          />
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
