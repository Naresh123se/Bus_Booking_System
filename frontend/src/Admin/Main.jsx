import React from 'react';
import AIndex from './AIndex';
import Extra from '../Pages/Extra';
import AllGraphs from './AllGraph';
import Pie from './Pie';
import Line from './Line';
import PeopleIcon from '@mui/icons-material/People';

const Main = () => {
    return (
        <>
            <div className='flex overflow-hidden w-full'>
                <div>
                    <AIndex />
                </div>
                <div>

                    <div >

                        <div className='flex ml-12 mr-12  justify-between mt-10 mb-10 '>

                            <div className='flex'>
                                <span className=' bg-[#FF4069] size-[120px] text-[white] justify-items-center w-24    grid   items-center rounded-l-md  '>
                                    <PeopleIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#009DF8]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Users</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>20 </h1>
                                        </span>

                                    </div>

                                </div>
                            </div>
                            <div className='flex'>
                                <span className=' bg-[#FF4069] size-[120px] text-[white] justify-items-center w-24    grid   items-center rounded-l-md  '>
                                    <PeopleIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#ffbb3d]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Users</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>20 </h1>
                                        </span>

                                    </div>

                                </div>
                            </div>

                            <div className='flex'>
                                <span className=' bg-[#FF4069] size-[120px] text-[white] justify-items-center w-24   grid   items-center rounded-l-md  '>
                                    <PeopleIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#B800D8]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Users</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>20 </h1>
                                        </span>

                                    </div>

                                </div>
                            </div>
                            <div className='flex'>
                                <span className=' bg-[#FF4069] size-[120px] text-[white] justify-items-center  w-24   grid   items-center rounded-l-md  '>
                                    <PeopleIcon sx={{ fontSize: '11vh' }} />
                                </span>

                                <div className='bg-[#009DF8]  pl-2 pt-2 text-lg text-[white]  rounded-r-lg      w-48 size-[120px]'>
                                    <div className='flex'>

                                        <span>

                                            <h1 className='flex  font-bold '>Users</h1>
                                            <h1 className=' text-[40px] font-bold mb-2'>20 </h1>
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


                            <Pie />
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
