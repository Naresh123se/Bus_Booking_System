import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAddCouponsMutation,
    useGetCouponsMutation,
    useEditCouponsMutation,
    useDeleteCouponsMutation, } from '../slices/coupons.js';

const TrendingOffers = () => {
    const trendingOffers = [
        {
            id: 1,
            description: 'Save up to Rs 300 on Hamro Bus. Limited time offer!',
            time:'20 May',
            bg:'bg-gradient-to-tr from-[#D37E0B] to-[#F9B961]',
            image: './OCT.png',
            copy: 'BUSOCT3'
        },
        {
            id: 2,
            time: '25 May',
            description: 'Save up to Rs 300 on Tata Bus. Hurry up!',
            bg: 'bg-gradient-to-tr from-[#113F93] to-[#386ECE]',
            image: './80x801.png',
            copy: 'BUS300'
        },
        {
            id: 3,
            time: '20 June',
            description: "Save up to Rs 250 on Hamro Bus. Don't miss out!",
            bg: 'bg-gradient-to-tr from-[#2B4669] to-[#4BBE8F]',
            image: './80x80.png',
            copy: 'SUPERHIT'
        },
    ];

    const [getCoupons] = useGetCouponsMutation();
    const [data, setData] = useState([]);
    const [copiedText, setCopiedText] = useState(null);
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => {
            setCopiedText(null);
        }, 1000);
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const result = await getCoupons();
            const newData = result.data.data;
            console.log("Original data:", newData); // Log the original data
            // Create a copy of the newData array and then reverse it
            const reversedData = [...newData].reverse();
            console.log("Reversed data:", reversedData); // Log the reversed data
            // Set the reversed data in the state
            setData(reversedData);

        } catch (error) {
            console.error('Failed to fetch Coupons:', error);
        }
    };



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
            <h2 className="text-xl font-semibold mb-4 ml-16 ">Trending Offers for Discount Coupons</h2>
            <Slider {...settings} className="w-[180vh] ml-9 pl-5 ">
            
                {data.map(offer => (
                    <div key={offer.id} className='flex'>
                    <div className={`shadow p-4  rounded-2xl ${offer.bg} flex w-96 gap-3 `}>
                            <div className='mt-8 '>
                            {offer.selectedImages.map((image, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="" style={{ fontSize: '1.2rem', color: '#555' }}></td>
                                                        <td className="">
                                                            <img src={image.url} style={{ height: '' }} alt="Image" />
                                                        </td>
                                                    </React.Fragment>
                                                ))}
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




