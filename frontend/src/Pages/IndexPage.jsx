import * as React from 'react';
import { useState } from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import SearchBar from './SearchBar';

const IndexPage = () => {
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

        <div className=' w-96 hover:shadow-lg hover:bg-[#f0f0f0] ml-20 pt-5 pb-5 border-[1px] border-[#C8C8C8]  bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>
        <div className=' w-96  hover:shadow-lg hover:bg-[#f0f0f0] pt-5 pb-5 border-[1px] border-[#C8C8C8]  w-10bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>

        <div className=' w-96 hover:shadow-lg hover:bg-[#f0f0f0]  pt-5 pb-5 border-[1px] border-[#C8C8C8]  w-10bg-[#FFF] shadow-[#b7acac] rounded-xl  grid place-content-center '>
          <div className='flex'>
            < AddLocationAltOutlinedIcon sx={{ fontSize: 45, }} className='' />    <p className='pt-2 text-xl'>Bus Track</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default IndexPage;
