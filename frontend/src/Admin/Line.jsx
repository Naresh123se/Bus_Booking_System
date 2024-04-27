import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useAddMutation, useGetScheduleMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/busSchedules.js';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
const [schedule] =useGetScheduleMutation();
const [sunday, setSunday] = useState ()
const [monday, setMonday] = useState ()
const [tuesday, setTuesday] = useState ()
const [wednesday, setWednesday] = useState ()
const [thursday, setThursday] = useState ()
const [friday, setFriday] = useState ()
const [saturday, setSaturday] = useState ()

useEffect(() => {
  sch();

}, []);


const sch = async () =>{
  try {
    const result = await schedule();
    const allData = result.data.data;
const sundayData = allData.filter(item => item.day === 'Sunday');
setSunday(sundayData.length)
const mondayData = allData.filter(item => item.day === 'Monday');
setMonday(mondayData.length)
const tuesdayData = allData.filter(item => item.day === 'Tuesday');
setTuesday(tuesdayData.length)
const wednesdayData = allData.filter(item => item.day === 'Wednesday');
setWednesday(wednesdayData.length)
const thursdayData = allData.filter(item => item.day === 'Thursday');
setThursday(thursdayData.length)
const fridayData = allData.filter(item => item.day === 'Friday');
setFriday(fridayData.length)
const saturdayData = allData.filter(item => item.day === 'Saturday');
setSaturday(saturdayData.length)
    
  } catch (error) {
    
  }

}
console.log(thursday )


  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Bus',
        data: [sunday, monday, tuesday,wednesday, thursday, friday, saturday],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: { 
            min: 0,
            max: 100
          }
        }
      }
    };

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, config);

    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [sunday, monday, tuesday,wednesday, thursday, friday, saturday]);

  return (
    <div className='ml-2 w-[70vh]'>
      <canvas ref={chartRef} style={{ width: '4px', height: '300px' }} />
    </div>
  );
};

export default LineChart;
