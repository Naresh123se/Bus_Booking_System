import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import Button from '@mui/joy/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CssVarsProvider } from '@mui/joy/styles';
import DarkModeToggle from './DarkModeToggle';
import Verify from './Verify.jsx';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

const IndexPage = () => {
  const [fromLocation, setFromLocation] = useState('');
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

  return (
    <>
      {/* image */}
      <div className='relative'>
        <img src="bus.png" alt="bus" className='w-full h-auto' />

        <div className='absolute  ml-10 inset-0 mt-80  flex items-center'  >
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
                  sx={{ width: '5cm' }}
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: selectedValue === "b" ? ' 5cm' : '10.58cm' }}
                        label="Departure"
                        value={value}

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
                      value={`${count} passenger${count>1 ?"s" :""} ${bike} bike${bike>1 ? "s" : " "}` }
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
      </div>

      <div className='flex gap-5 mt-28 '>

        <div className=' w-96 hover:shadow-lg hover:bg-[#f0f0f0] ml-20 pt-5 pb-5 border-[1px] border-[#C8C8C8]  bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>
        <div className=' w-96  hover:shadow-lg hover:bg-[#f0f0f0] pt-5 pb-5 border-[1px] border-[#C8C8C8]  w-10bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>

        <div className=' w-96 hover:shadow-lg hover:bg-[#f0f0f0]  pt-5 pb-5 border-[1px] border-[#C8C8C8]  w-10bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>

      </div>


      {/* #ca801f */}
      <Verify/>

    </>


  );
};

export default IndexPage;
