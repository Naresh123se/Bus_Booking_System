import React, { useEffect, useState, useRef } from 'react';
import AIndex from './AIndex';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto'; // Import Chart.js library
import AllGraphs from './AllGraph';

import Line from './Line';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { useTotalUsersMutation } from '../slices/usersApiSlice'
import { useTotalBusesMutation } from '../slices/bus'
import { useTotalSchedulesMutation } from '../slices/busSchedules'
import { useTotalTicketsMutation } from '../slices/ticket'

const Main = () => {
  const navigate = useNavigate();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

    const [user] = useTotalUsersMutation();
    const [totalUser, setTotalUser] = useState();
    const [bus] = useTotalBusesMutation();
    const [totalBuses, setTotalBuses] = useState();
    const [schedules] = useTotalSchedulesMutation();
    const [totalSchedules, setTotalSchedules] = useState();
    const [ticket] = useTotalTicketsMutation();
    const [totalTickets, setTotalTickets] = useState();


    useEffect(() => {
        userData();
        busData();
        schedulesData();
        ticketData();
        pie();
    }, [])


    useEffect(() => {
        // Call the pie function only when all data is available
        if (totalUser !== undefined && totalBuses !== undefined && totalSchedules !== undefined && totalTickets !== undefined) {
          pie();
        }
      }, [totalUser, totalBuses, totalSchedules, totalTickets]);


    //user
    const userData = async () => {
        try {
            const result = await user();
            setTotalUser(result.data.count)
        } catch (error) {
            console.log(error);
        }
    };
    //bus
    const busData = async () => {
        try {
            const result = await bus();
            setTotalBuses(result.data.count)     
        } catch (error) {
            console.log(error);
        }
    };

    //schedules
    const schedulesData = async () => {
        try {
            const result = await schedules();
            setTotalSchedules(result.data.count)     
        } catch (error) {
            console.log(error);
        }
    };

    //ticket
    const ticketData = async () => {
        try {
            const result = await ticket();
            setTotalTickets(result.data.count)     
        } catch (error) {
            console.log(error);
        }
    };

    //pie


        const pie = async () => {
        const ctx = chartRef.current.getContext('2d');
        const config = {
          type: 'doughnut',
          data: {
            labels: ['Users', 'Buses', 'Schedules','Ticket' ],
            datasets: [{
              label: 'merobus',
              data: [totalUser, totalBuses, totalSchedules,totalTickets],
              backgroundColor: ['#FF4069','#FFBB3D','#0FADAA','#D30DF2' ],
              hoverOffset: 10
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
        }
      };


    return (
        <>
            <div className='flex overflow-hidden w-full'>
                <div>
                    <AIndex />
                </div>
                <div>
                    <div >
                        <div className='flex ml-12 mr-12  justify-between mt-10 mb-10 '>
                            <div className='flex hover:shadow-xl cursor-pointer ' onClick={()=>navigate('Passenger')}>
                                <span className=' bg-[#009DF8] size-[120px] text-[white] justify-items-center w-24    grid   items-center rounded-l-md  '>
                                    <PeopleIcon sx={{ fontSize: '11vh' }} />
                                </span>
                                <div className='bg-[#FF4069]  pl-2 pt-2 text-lg text-[white] text-center   rounded-r-lg      w-48 size-[120px] '>
                                    <div className='flex'>
                                        <span className=''>
                                            <h1 className='flex  font-bold '>Users</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>{totalUser}</h1>
                                        </span>

                                    </div>

                                </div>
                            </div>
                            <div className='flex'>
                                <span className=' bg-[#009DF8] size-[120px] text-[white] justify-items-center w-24    grid   items-center rounded-l-md  '>
                                    <DirectionsBusIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#ffbb3d]  pl-2 pt-2 text-xl text-[white]  rounded-r-lg  text-center    w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span className=''>

                                            <h1 className='flex  font-bold '>Buses</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'> {totalBuses}</h1>
                                        </span>

                                    </div>

                                </div>
                            </div>

                            <div className='flex'>
                                <span className=' bg-[#009DF8] size-[120px] text-[white] justify-items-center w-24   grid   items-center rounded-l-md  '>
                                    <DepartureBoardIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#0FADAA]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Schedules</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>{totalSchedules} </h1>
                                        </span>

                                    </div>

                                </div>
                            </div>
                            <div className='flex'>
                                <span className=' bg-[#009DF8] size-[120px] text-[white] justify-items-center  w-24   grid   items-center rounded-l-md  '>
                                    <ConfirmationNumberIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#D30DF2]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Tickets</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>{totalTickets} </h1>
                                        </span>

                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>



                    <div>


                    </div>

                    <div className='flex'>
                        <div>
                           
                        <div  className=''   ref={chartContainerRef} style={{ width: '350px', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
                        </div>
                        <AllGraphs />
                        <div>

                        </div>
                        <Line />
                    </div>





                </div>



            </div>


        </>
    );
};

export default Main;
