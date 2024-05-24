import React from 'react'

const Body1 = () => {
  return (

    <div className='flex gap-[19%]  p-5 '>
      <div className='h-[%]'>
        <img src="./Body1/health.svg" alt="Health" width={'40%'} className=' mt- ml-5' />
        <p className='pt-3 font-semibold'>Health and Safety</p>
      </div>
      <div className='ml-32'>
        <img src="./Body1/seat.svg" alt="" width={'34%'} className='ml-5' />
        <p className='pt-2 font-semibold' >Comfort on board</p>
      </div>
      <div className='mr-20 '>
        <img src="./Body1/eco-friendly.svg" alt="" width={'70%'} className='mt-3 ml-1' />
        <p className='mt-2 font-semibold'>Travel eco-friendly</p>
      </div>
    </div>
  )
}

export default Body1