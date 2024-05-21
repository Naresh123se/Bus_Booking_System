import * as React from 'react';
import SearchBar from './SearchBar';
import Offers from '../Booking/Offers.jsx';
import { useNavigate } from 'react-router-dom';
import Blog from '../Pages/Blogg.jsx';
import Body1 from './Body1.jsx';
const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* image */}
      <div className='relative'>
        <img src="bus.png" alt="bus" className='w-full h-auto' />

        <div className='absolute  ml-10 inset-0 mt-80  flex items-center sm:ml-0 sm:w-full lg:mt-96 md:mt-[64vh]  md:ml-20 lg:ml-28 '>
          <SearchBar />
        </div>

      
      </div>
      <div className='mt-28  sm:mt-[90vh]  lg:mt-96 md:mt-[63vh]  sm:bg-[red] md:bg-bg1 lg:bg-[#63b378] xl:bg-[black] 2xl:bg-[#ebeb4d]'>
          <Offers/>
        </div>
        <div className=' mt-16  border-[#ebdfdf] border'>
        <div className='   ml-20   '>
 <Body1/>
           
      </div>
        </div>
     

      <div className='  '>
      {/* <Destinations/> */}
     
      </div>
      <div className=''>
        <Blog/>
      </div>
    </>
  );
};

export default IndexPage;
