import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchBar from './SearchBar'
import { useGetScheduleMutation } from '../slices/busSchedules.js';
import { faDivide } from '@fortawesome/free-solid-svg-icons';

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [get] = useGetScheduleMutation();
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchSchedules = async (e) => {
      try {
        const result = await get();
        setData(result.data.data);
        console.log(result);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <>
      <div className='m-10  '>
        <SearchBar />
      </div>

      <body className='bg-[#F7F7F7] mt-5 '>
        <div className='ml-64  pt-5 pb-5  border-[#C8C8C8] shadow-[#b7acac] rounded-md'>
          <ButtonGroup   >
            {/* <Button className='w-72' sx={{ color: "black" }}>{formattedCurrentDate}</Button> */}
            {/* <Button className='w-72' sx={{ color: "black" }}>{formattedYesterday}</Button> */}
            {/* <Button className='w-72' sx={{ color: "black" }}> {formattedTomorrow}</Button> */}
          </ButtonGroup>
        </div>
        
        {data.map((item, index) => (
          <div key={index} className='ml-64 mr-[248px] pb-5 border-[1px] border-[#C8C8C8] shadow-[#b7acac] rounded-md'>
            <div className='flex  mr-10 ml-10 justify-between'>
              <div>{item.startTime}</div>
              <hr className=" flex-1 ml-1 mr-1  mt-3   h-border border-[#a7a6a6]" />
              <div className='mr-60'>{item.endTime}</div>
              <hr className=" flex-1 ml-1 mr-1  mt-3   h-border border-[#a7a6a6]" />
              <div>{item.price}</div>
            </div>
            <div className='ml-10 w-[59.6%]  flex justify-between'>
              <div className='mr-60'>{item.startLocation}</div>
              <div>{item.endLocation}</div>
            </div>
            <div className='ml-10 flex justify-between'>
              <div>icon</div>
              <div className='mt-6 mr-8'>
                <Button className='mt-6' variant="contained" > Booking</Button>
              </div>
            </div>
          </div>
        ))}
      </body>
    </>
  )
}

export default Booking
