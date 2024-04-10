import * as React from 'react';
import Button from '@mui/material/Button';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import SearchBar from './SearchBar';
import Offers from '../Booking/Offers.jsx';
import { useNavigate } from 'react-router-dom';
import Destinations from '../Booking/Destinations.jsx';
import Blog from '../Pages/Blog.jsx';
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
      <div className='flex gap-5 mt-28 '>

        
     
          <div className=' '>
            <button className=' w-80   ml-20    flex place-content-center  ' onClick={click11}>
            {/* < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'  >Route</p> */}
            <img src="Paper map.gif" alt="" className='size-60  shadow-[#b7acac]  border-[#C8C8C8] hover:shadow-lg border-[1px] rounded-xl'/>
            </button>
          </div>

          <div className=' '>
            <button className=' w-80 hover:shadow-lg hover:bg-[#f0f0f0] ml-20 pt-5 pb-5 border-[1px] border-[#C8C8C8]  bg-[#FFF] shadow-[#b7acac] rounded-xl  flex place-content-center  ' onClick={Booking}>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'  >Route</p>
            </button>
          </div>

          <div className=' '>
            <button className=' w-80 hover:shadow-lg hover:bg-[#f0f0f0] ml-20 pt-5 pb-5 border-[1px] border-[#C8C8C8]  bg-[#FFF] shadow-[#b7acac] rounded-xl  flex place-content-center  ' onClick={click11}>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'  >Route</p>
            </button>
          </div>
      <div>
        <p></p>
      </div>
      </div>

      <div className='  '>
      <Destinations/>
      </div>
      <div className=''>
        <Blog/>
      </div>
    </>
  );
};

export default IndexPage;
