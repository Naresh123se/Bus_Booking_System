import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Booking1 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    <body className='bg-[#F7F7F7] mt-5'>
    <div className='ml-64  pt-5 pb-5  border-[#C8C8C8] shadow-[#b7acac] rounded-md  '>
    <ButtonGroup   >
  <Button className='w-72' sx={{color:"black"}}>{formattedCurrentDate}</Button>
  <Button className='w-72' sx={{color:"black"}}>{formattedYesterday}</Button>
  <Button className='w-72' sx={{color:"black"}}> {formattedTomorrow}</Button>
</ButtonGroup>
        </div>
        <div className='ml-64 mr-[248px]   pb-5 border-[1px] border-[#C8C8C8] shadow-[#b7acac] rounded-md  '>
        <span>time</span><br />
        <span>place</span>

        </div>
    </body>
    </>
  )
}

export default Booking1