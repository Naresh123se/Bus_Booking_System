import React from 'react'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';

const Body1 = () => {
  return (
    <>
      <div className="mx-20 py-12  flex   gap-5  t20 ">
        <div className="flex  gap-3 h-32  justify-center items-center w-3/12 bg-[#dfdada] px-5 rounded-md a">
          <AirlineSeatReclineExtraOutlinedIcon sx={{ fontSize: '1.5cm' }} className='text-[#2254AD]' />
          <span className='flex flex-col'>
            <h2 className='font-semibold   text-2xl -leading-[10px]'>Confort on board</h2>
            <p>Equipped comfortable seats</p>
          </span>
        </div>

        <div className="flex flex-row h-32   items-center gap-3 py-10 bg-[#dfdada] px-5 rounded-md  w-3/12  b">
          < HealthAndSafetyOutlinedIcon sx={{ fontSize: '1.5cm' }} className='text-[#2254AD]' />
          <span className='flex flex-col'>
            <h2 className='font-semibold   text-2xl -leading-[10px]'>Health and Safety</h2>
            <p>Others safe while traveling</p>
          </span>
        </div>
        <div className="flex flex-row  gap-3 h-32   items-center bg-[#dfdada] px-5 rounded-md  w-3/12 c">
          <RecyclingOutlinedIcon sx={{ fontSize: '1.5cm' }} className='text-[#2254AD]' />
          <span className='flex flex-col'>
            <h2 className='font-semibold   text-2xl -leading-[10px]'>Easy Refund</h2>
            <p>No Questions Asked</p>
          </span>
        </div>

        <div className="flex flex-row  gap-3 h-32  items-center bg-[#dfdada] px-5 rounded-md w-3/12 d ">
          <SpaOutlinedIcon sx={{ fontSize: '1.5cm' }} className='text-[#2254AD]' />
          <span className='flex flex-col'>
            <h2 className='font-semibold   text-2xl -leading-[10px]'>Travel friendly</h2>
            <p>Our efficient coaches</p>
          </span>
        </div>


      </div>
    </>
  )
}
export default Body1