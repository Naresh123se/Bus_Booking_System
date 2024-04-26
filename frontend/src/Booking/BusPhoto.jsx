import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS



const BusPhoto = () => {
  const trendingOffers = [
    {
      id: 1,
      title: 'Save up to Rs 300 on Hamro Bus. Limited time offer!',
      time: '20 Mar',
      image: 'destinations/pokhara.png',
      // image1: 'destinations/pokhara.png',
      bg: 'bg-gradient-to-tr from-[#D37E0B] to-[#F9B961]',
      // image: 'https://via.placeholder.com/800x400/FF0000/FFFFFF?text=Image+1',
      copy: 'BUSOCT3'
    },
    {
      id: 2,
      title: 'Buy one, get one free on all clothing items. Hurry up!',
      time: '20 Mar',
      image:'destinations/image.png',
      bg: 'bg-gradient-to-tr from-[#113F93] to-[#386ECE]',
      // image: 'https://via.placeholder.com/800x400/00FF00/FFFFFF?text=Image+2',
      copy: '20172050'
    },
    {
      id: 3,
      title: "Get free shipping on all orders over $50. Don't miss out!",
      time: '20 Mar',
      bg: 'bg-gradient-to-tr from-[#2B4669] to-[#4BBE8F]',
      // image: 'https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Image+3',
      copy: '222'
    },
  ];

  const [copiedText, setCopiedText] = useState(null);



  const CustomNextArrow = ({ onClick }) => (
    <button style={{ color: "red", background:'#009DF8' }}  className="slick-next custom-next-arrow  rounded  " onClick={onClick}>

    </button>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <button style={{ background:'#009DF8'}}  className="slick-arrow slick-prev custom-prev-arrow rounded  " onClick={onClick}>
      Previous
    </button>
  );

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow  />
  };
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>


<span onClick={toggleVisibility} className='cursor-pointer shadow hover:text-[#009DF8]  ml-40  '>Bus Photos</span>
{isVisible && 
  <div className=''>
      <div className=' w-[80vh] px-7 bg mt-5  '>

        {/* <h2 className="text-xl font-semibold mb-4 ml-16">Trending Offers for Discount Coupons</h2> */}
        <Slider {...settings} className="mr-44 ">
          {trendingOffers.map(offer => (
            <div key={offer.id} >
              <div className='flex h-60 p   p-1 bg-[#185EA5] rounded-md'>
             
                  <img src={offer.image} className="object-cover   object-center "  />
          
              </div>
            </div>
          ))}
        </Slider>
       

      </div>
      </div>
      }
    </>
  );
};

export default BusPhoto;
