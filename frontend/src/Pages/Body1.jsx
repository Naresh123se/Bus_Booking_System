import React from 'react'

const Body1 = () => {
  return (

    <div className='flex gap-96  ml-20  bg-[#F5F5F5]  p-5 '>
      <div className='  border-[#009DF8] rounded-md bg-[#E5E5E5]'>
        <img src="./Body1/health.svg" alt="Health and Safety" className=' ml-5 pr-6 size-36 ' />
        <p className='  flex justify-center font-semibold'>Health and Safety</p>
      </div>
      <div className=' rounded-md bg-[#E5E5E5]'>
        <div>
        <img src="./Body1/seat.svg" alt="Comfort on board"  className='ml-5  size-36 ' />
        <p className='font-semibold  flex justify-center' >Comfort on board</p>
        </div>
        
      </div>
      <div className=' bg-[#E5E5E5] rounded-md'>
        <img src="./Body1/eco-friendly.svg" alt="Travel eco-friendly"  className=' ml-5  size-36  ' />
        <p className=' flex justify-center  mb-2 font-semibold'>Travel eco-friendly</p>
      </div>
    </div>
  )
}

export default Body1