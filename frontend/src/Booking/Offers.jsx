import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useMediaQuery } from 'react-responsive';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    useAddCouponsMutation,
    useGetCouponsMutation,
    useEditCouponsMutation,
    useDeleteCouponsMutation,
} from '../slices/coupons.js';

const TrendingOffers = () => {


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
    const MobileSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
        dots: false, // Hide the dots navigation
        arrows: false // Hide the next and previous arrows
    };

    const DesktopSettings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
        dots: false, // Hide the dots navigation
        arrows: false // Hide the next and previous arrows
    };
    const TabletSettings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1600,
        dots: false, // Hide the dots navigation
        arrows: false // Hide the next and previous arrows
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

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    return (
        <div className="ml-[80px]  pl-1.5 sm:ml-10 mr-20 sm:mr-10 pt-3 sm:pt-2 pb-5 shadow-lg mt-4 sm:mt-1 pr-5 sm:pr-2 border border-[#423f3f17]  bg-[#FFF] shadow-[#b7acac] rounded-xl  md:ml-32  sm:w-[48vh] lg:w-[120vh]  md:w-[90vh] xl:w-[90vh] ">
            <h2 className="text-xl sm:text-[14px] font-semibold mb-4 sm:mb-1 sm:mt-30 ml-16 sm:ml-2 sm:w-full">Trending Offers for Discount Coupons</h2>
            {isMobile ? (
                <Slider {...MobileSettings} className="w-full ml-9 sm:ml-1 sm:pl-1 pl-5">
                    {data.map(offer => (
                        <div key={offer.id} className=''>
                            <div className={`shadow p-4  rounded-2xl ${offer.bg} flex w-96  `}>
                                <div className='mt-8 sm:mt-16'>
                                    {offer.selectedImages.map((image, index) => (
                                        <React.Fragment key={index}>
                                            <td className="" style={{ fontSize: '1.2rem', color: '#555' }}></td>
                                            <td className="sm:size-11">
                                                <img src={image.url} style={{ height: '' }} alt="Image" />
                                            </td>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold w-24 rounded-xl mb-1 bg-[#ebeaea48]   text-[#240f0f] text-center sm:text-sm '>MERO BUS</p>
                                    <h3 className="text-lg font-semibold mb-2 sm:text-sm">{offer.title}</h3>
                                    <p className="text-[#ffffff] font-semibold  sm:text-md sm:w-42">{offer.description}</p>
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
            ) : isTablet ? (
                <Slider {...TabletSettings} className=" ml-5 sm:ml-1 sm:pl-1 pl-5   ">
                    {data.map(offer => (
                        <div key={offer.id} className='flex gap-3'>
                            <div className={`shadow p-4  rounded-2xl ${offer.bg} flex gap-2  `}>
                                <div className='mt-8 sm:mt-16 '>
                                    {offer.selectedImages.map((image, index) => (
                                        <React.Fragment key={index}>
                                            <td className="" style={{ fontSize: '1.2rem', color: '#555' }}></td>
                                            <td className="sm:size-11">
                                                <img src={image.url} style={{ height: '' }} alt="Image" />
                                            </td>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold w-24 rounded-xl mb-1 bg-[#ebeaea48]   text-[#240f0f] text-center sm:text-sm '>MERO BUS</p>
                                    <h3 className="text-lg font-semibold mb-2 sm:text-sm">{offer.title}</h3>
                                    <p className="text-[#ffffff] font-semibold  sm:text-md sm:w-42">{offer.description}</p>
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
            ) : (
                <Slider {...DesktopSettings} className="w-[180vh] sm:w-full md:w-full ml-9 sm:ml-1 sm:pl-1 pl-5">
                    {data.map(offer => (
                        <div key={offer.id} className=''>
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
            )}


            {copiedText && (
                <div className="fixed bottom-2 right-[11vh] bg-[black] text-[white] p-3 rounded-md  mb-4 ">
                    <p>{copiedText} code copied! </p>
                </div>
            )}
        </div>
    );
};

export default TrendingOffers;




