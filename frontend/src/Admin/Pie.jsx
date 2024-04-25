import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library
import { useTotalUsersMutation } from '../slices/usersApiSlice'
import { useTotalBusesMutation } from '../slices/bus'
import { useTotalSchedulesMutation } from '../slices/busSchedules'
import { useTotalTicketsMutation } from '../slices/ticket'
import { useNavigate } from 'react-router-dom';

const DoughnutChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const navigate = useNavigate();
   
    const [user] = useTotalUsersMutation();
    const [totalUser, setTotalUser] = useState();
    const [bus] = useTotalBusesMutation();
    const [totalBuses, setTotalBuses] = useState();
    const [schedules] = useTotalSchedulesMutation();
    const [totalSchedules, setTotalSchedules] = useState();
    const [ticket] = useTotalTicketsMutation();
    const [totalTickets, setTotalTickets] = useState();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const config = {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4
        }]
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
  }, []);

  return (
    <div  className='ml-20'   ref={chartContainerRef} style={{ width: '350px', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;
