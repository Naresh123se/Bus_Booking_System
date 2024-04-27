import * as React from 'react';
import Button from '@mui/material/Button';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import SearchBar from './SearchBar';
import Offers from '../Booking/Offers.jsx';
import { useNavigate } from 'react-router-dom';
import Destinations from '../Booking/Destinations.jsx';
import Blog from '../Pages/Blogg.jsx';
import Body1 from './Body1.jsx';
const IndexPage = () => {
  const navigate = useNavigate();
  const click11 = () => {
    navigate('/location');
  };
  const Booking = () => {
    navigate('/Booking');
  };

  return (
    <>
      {/* image */}
      <div className='relative'>
        <img src="bus.png" alt="bus" className='w-full h-auto' />

        <div className='absolute  ml-10 inset-0 mt-80  flex items-center'  >
          <SearchBar />
        </div>

      
      </div>
      <div className='mt-28'>
          <Offers/>
        </div>
        <div className=' mt-16 border'>
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
