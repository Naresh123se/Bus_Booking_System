import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TrendingOffers = () => {
    const trendingOffers = [
        {
            id: 1,
           
            description: 'Save up to Rs 300 on Hamro Bus. Limited time offer!',
            time: '20 Mar',
            bg: 'bg-gradient-to-tr from-[#D37E0B] to-[#F9B961]',
            image: './OCT.png',
            copy: 'BUSOCT3'
        },
        {
            id: 2,
            time: '20 Mar',
            description: 'Buy one, get one free on all clothing items. Hurry up!',
            bg: 'bg-gradient-to-tr from-[#113F93] to-[#386ECE]',
            image: './80x801.png',
            copy: '20172050'
        },
        {
            id: 3,
            time: '20 Mar',
            description: "Get free shipping on all orders over $50. Don't miss out!",
            bg: 'bg-gradient-to-tr from-[#2B4669] to-[#4BBE8F]',
            image: './80x80.png',
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

//     const CustomNextArrow = ({ onClick }) => (
//         <button className="slick-arrow slick-next custom-next-arrow bg-blue-500 text-white rounded-full w-10 h-10" onClick={onClick}>
//             Next1
//         </button>
//     );

//     const CustomPrevArrow = ({ onClick }) => (
      
//         <button className="slick-arrow slick-prev custom-prev-arrow bg-blue-500 text-white rounded-full w-10 h-10 flex items-end justify-start" onClick={onClick}>
//     Previous
// </button>

//     );

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
       dots: false, // Hide the dots navigation
        arrows: false // Hide the next and previous arrows
        
    };

    return (
        <div className="ml-20 mr-20   pt-3 pb-5  shadow-lg   mt-4   pr-5  border border-[#423f3f17] z-50  bg-[#FFF] shadow-[#b7acac] rounded-xl ">
            <h2 className="text-xl font-semibold mb-4 ml-16">Trending Offers for Discount Coupons</h2>
            <Slider {...settings} className="w-[180vh] ml-9 pl-5">
                {trendingOffers.map(offer => (
                    <div key={offer.id}>
                        <div className={`shadow p-4  rounded-2xl ${offer.bg} flex w-96 gap-3 `}>
                            <div className='mt-8 '>
                                <img src={offer.image} className="mr-4" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold w-24 rounded-xl mb-1 bg-[#ebeaea48]   text-[#240f0f] text-center '>MERO BUS</p>
                                <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                                <p className="text-[#ffffff] font-semibold ">{offer.description}</p>
                                <p className="text-[#ffffff] mt-2">Valid till {offer.time}</p>
                                <div className='flex gap-3 mt-2'>
                                    <p className="text-[#ffffff] rounded-lg   bg-[#ebeaea48] font-semibold border-dashed border pl-1 pr-1">{offer.copy}</p>
                                    <button onClick={() => copyText(offer.copy)}> <ContentCopyIcon sx={{ color: 'white' }} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            {copiedText && (
                <div className="fixed bottom-2 right-[11vh] bg-[black] text-[white] p-3 rounded-md  mb-4 ">
                    <p>{copiedText} code copied! </p>
                </div>
            )}
        </div>
    );
};

export default TrendingOffers;




