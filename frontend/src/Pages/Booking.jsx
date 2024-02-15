import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchBar from './SearchBar'

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

// time
const time = {hour : 'numeric', hour12: false}
const Time = currentTime.toLocaleTimeString( undefined, time);

const time2 = new Date(currentTime);
time2.setTime(time2.getTime() +(1*60*60*1000));
const two = time2.toLocaleTimeString( undefined, time);



  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedCurrentDate = currentDate.toLocaleDateString(undefined, options);

  // Calculate yesterday's date
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() + 1);
  const formattedYesterday = yesterday.toLocaleDateString(undefined, options);

  // Calculate tomorrow's date
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 2);
  const formattedTomorrow = tomorrow.toLocaleDateString(undefined, options);

  return (
    <>
    <div className='m-10  '>
    <SearchBar/>
    </div>
    
    <body className='bg-[#F7F7F7] mt-5 '>
    <div className='ml-64  pt-5 pb-5  border-[#C8C8C8] shadow-[#b7acac] rounded-md  '>
    <ButtonGroup   >
  <Button className='w-72' sx={{color:"black"}}>{formattedCurrentDate}</Button>
  <Button className='w-72' sx={{color:"black"}}>{formattedYesterday}</Button>
  <Button className='w-72' sx={{color:"black"}}> {formattedTomorrow}</Button>
</ButtonGroup>

        </div>


        <div className='ml-64 mr-[248px]   pb-5 border-[1px] border-[#C8C8C8] shadow-[#b7acac] rounded-md  '>
        

        

      
        <div className='flex  mr-10 ml-10 justify-between'>
        <div>time</div> 
        <hr class=" flex-1 ml-1 mr-1  mt-3   h-border border-[#a7a6a6] "/>
        <p>time</p>
        <hr class=" flex-1 ml-1 mr-1  mt-3   h-border border-[#a7a6a6] "/>
        <div className='mr-60'>time</div>
        <div>price</div>
        </div>
      
        <div className='ml-10 w-[59.6%]  flex justify-between'>
        <div className=''>locatio</div>
        <div className=''>place</div>
        </div>
        <div className='ml-10 flex justify-between'>
        <div>icone</div>
        <div className='mt-6 mr-8'>
        <Button className='mt-6' variant="contained" > Booking</Button> 
        </div>
      
        </div>
       
    
      
        </div>

        <div className='ml-64 mr-[248px]   pb-5 border-[1px] border-[#C8C8C8] shadow-[#b7acac] rounded-md  '>
        <span style={{ fontSize: '16px', fontWeight:'bold'}}>{Time}</span> <br />

        <span>Kathmandu</span><br />
        <span>{two}:20</span>

        </div>
    </body>
    </>
  )
}

export default Booking