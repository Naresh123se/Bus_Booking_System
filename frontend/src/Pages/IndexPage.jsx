import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import Button from '@mui/joy/Button';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const LocationForm = () => {
  const [fromLocation, setFromLocation] = useState('1 Adult');
  const [toLocation, setToLocation] = useState('');
  const [arrowDirection, setArrowDirection] = useState('right');
  const [value, setValue] = React.useState(dayjs());

  const switchLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };


  const [selectedValue, setSelectedValue] = React.useState('a');

  const CustomDemoItem = ({ label, defaultValue }) => (
    <DemoItem label={label}>
      <MobileDatePicker defaultValue={defaultValue} />
    </DemoItem>
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };

  const switchArrowDirection = () => {
    setArrowDirection(arrowDirection === 'right' ? 'left' : 'right');
  };
  
const RadioWithHiddenDiv = () => {
  const [selectedValue, setselectedValue] = useState('on');
};

  return (
    <div className='' >
        {/* image */}
       <div className='absolute '>
       <img src="bus.png" alt="bus" />
       </div>
        
    
{/*radio button */}
      <div className=' absolute shadow-lg ml-10 mt-64 pr-5 pl-5 pb-5  pt-5  bg-[#FFF] shadow-[#b7acac] rounded-xl   '>
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
            sx={{  width: '5cm' }}
            placeholder='Kathmandu'
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
    <LocalizationProvider    dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}>
        <DatePicker
      sx={{ width: selectedValue === "b" ? ' 5cm' : '10.57cm' }}
          label="Departure"
          value={value}
         
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
   </div>
    <div className=''>
      {selectedValue === "b" && (
    <LocalizationProvider    dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}>
        <DatePicker
      sx={{ width: "5cm" }}
          label="Return"
          value={value}
         
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
      )}
    </div>
     
  
    </div>
    <div>

    <div className='mt-4 ml-7'>
          <TextField
            label="FROM"
            id="people"
            sx={{ width: '5cm' }}
            placeholder='Pokhara'
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"> </InputAdornment>,
            }}
          />
        </div>
    </div>

<div className='ml-2 pt-5 '>
<Button  className=''>
  Search
</Button>
</div>

</div>
</div>

    </div>
  );
};

export default LocationForm;
