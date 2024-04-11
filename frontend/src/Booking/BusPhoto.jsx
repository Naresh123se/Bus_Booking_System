import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Destinations from './Destinations';

const BusPhoto = () => {
  const trendingOffers = [
    {
      id: 1,
      title: 'Save up to Rs 300 on Hamro Bus. Limited time offer!',
      time: '20 Mar',
      image: 'destinations/pokhara.png',
      image1: 'destinations/pokhara.png',
      bg: 'bg-gradient-to-tr from-[#D37E0B] to-[#F9B961]',
      // image: 'https://via.placeholder.com/800x400/FF0000/FFFFFF?text=Image+1',
      copy: 'BUSOCT3'
    },
    {
      id: 2,
      title: 'Buy one, get one free on all clothing items. Hurry up!',
      time: '20 Mar',
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

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);

    setTimeout(() => {
      setCopiedText(null);
    }, 1000); // Remove copied message after 1.5 seconds
  };

  const CustomNextArrow = ({ onClick }) => (
    <button className="slick-next custom-next-arrow " onClick={onClick}>

    </button>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <button className="slick-arrow slick-prev custom-prev-arrow " onClick={onClick}>
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
    prevArrow: <CustomPrevArrow />
  };
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>


<span onClick={toggleVisibility} className='cursor-pointer hover:text-[red] ml-96'>bus Photos</span>
{isVisible && 

      <div className='bg-[#7f7d7d] w-[90vh] px-10 bg mt-10 '>

        {/* <h2 className="text-xl font-semibold mb-4 ml-16">Trending Offers for Discount Coupons</h2> */}
        <Slider {...settings} className=" ">
          {trendingOffers.map(offer => (
            <div key={offer.id}>
              <div className='flex'>
              <div className=''>
                  <img src={offer.image} className="object-cover   object-center "  />
                </div>
                <div className=''>
                  <img src={offer.image1} className="object-cover   object-center "  />
                </div>
              </div>
                
                
         
            </div>
          ))}
        </Slider>
        {copiedText && (
          <div className="fixed bottom-2 right-[95vh] bg-[black] text-[white] p-3 rounded-md mr-4 mb-4 z-50">
            <p>{copiedText} code copied! </p>
          </div>
        )}

      </div>
      }
    </>
  );
};

export default BusPhoto;
