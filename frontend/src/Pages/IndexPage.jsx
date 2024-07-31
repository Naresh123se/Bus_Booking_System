import * as React from 'react';
import SearchBar from './SearchBar';
import Offers from '../Booking/Offers.jsx';
import Blog from '../Pages/Blogg.jsx';
import Body1 from './Body1.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IndexPage = () => {
  localStorage.removeItem('emailSent');
  // const li = gsap.timeline({
  //   scrollTrigger:{
  //     trigger:'.ok',
  //     scroller:'body',
  //     markers:true,
  //     // start: 'top 50%',
  //     // end:'top 0',
  //     scrub:2,
  //   }
  // })
  useGSAP(() => {
    gsap.from(".ram", {
      x: -30,
      opacity: 0,
      duration: 1,
      delay: 1,
      stagger: 4,
      scrollTrigger:{
        trigger:'.ram',
        scroller:'.div1',
        markers:'true',
        start: 'top 50%',
        scrub:2,
      }
    })
  })

  return (

    <>
    <div className='ok2'>

      {/* image */}
      <div className='relative'>
        <img src="bus.png" alt="bus" className='w-full h-auto ab' />
        <div className='absolute  ml-10 inset-0 mt-80  flex items-center sm:ml-0 sm:w-full lg:mt-96 md:mt-[64vh]  md:ml-20 lg:ml-28 '>
          <SearchBar />
        </div>
      </div> 

      {/* <div className='mt-28  sm:mt-[90vh]  lg:mt-96 md:mt-[63vh]  sm:bg-[red] md:bg-bg1 lg:bg-[#63b378] xl:bg-[black] 2xl:bg-[#ebeb4d]'> */}
      <div className='mt-28 sm:mt-[90vh]  lg:mt-96 md:mt-[63vh] '>
        <Offers />
      </div>

      <div className=' mt-16 bg-[#439dd1] '>
        <div className='ok'>
          <Body1 className='ok'  />
        </div>
      </div>

     

      <div className=''>
        <Blog />
      </div>
    </div>

    </>
  );
};

export default IndexPage;
