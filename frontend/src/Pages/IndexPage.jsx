import * as React from 'react';
import Button from '@mui/material/Button';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

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

      <div className='flex gap-5 mt-28 '>

        

     
          <div className=' '>
            <button className=' w-80 hover:shadow-lg hover:bg-[#f0f0f0] ml-20 pt-5 pb-5 border-[1px] border-[#C8C8C8]  bg-[#FFF] shadow-[#b7acac] rounded-xl  flex place-content-center  ' onClick={click11}>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'  >Route</p>
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
    </>
  );
};

export default IndexPage;
