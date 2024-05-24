import React, { useEffect, useState } from 'react';
import { useGetBlogMutation } from '../slices/blog'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Blog = () => {
  const [blog] = useGetBlogMutation();
  const [data11, setData11] = useState([]);
  const [data12, setData12] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const truncateText = (text, words) => {
    const wordArray = text.split(' ');
    const truncatedText = wordArray.slice(0, words).join(' ');
    return truncatedText + (wordArray.length > words ? '...' : ''); // Add ellipsis if text is truncated
  };

  const fetchData = async () => {
    try {
      const result = await blog();
      const newData = result.data.data;

      console.log("Original data:", newData); // Log the original data
      // Create a copy of the newData array and then reverse it
      const reversedData = [...newData].reverse();
      console.log("Reversed data:", reversedData);

      // Get the URL from the address bar
      const urlParams = new URLSearchParams(window.location.search);

      // Get the value of the "Id" parameter
      const idFromUrl = urlParams.get('Id');

      // Find the item in reversedData with the matching ID
      const filtered = reversedData.filter(item => item._id === idFromUrl);

      setData11(filtered);
      setData12(reversedData);

    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };

  return (
    <>
      {data11.map((card, index) => (
        <div key={index} className=" ">
          <h2 className="text-lg font-medium text-gray-900 ml- ml-48 mb-3 mt-2">{card.title}</h2>
          <div className="text-base leading-relaxed ml-40 "><AccountCircleIcon sx={{ color: '#C5C5C5', fontSize: "40px" }} /> {card.author}</div>
          <hr className='text-[#d7d2d2]' />
          <div className='flex gap-16'>
            <div >
              <div className=' mt-5 ml-20 h-[460px]   pt-5 pb-5  bg-[#868282]  bg-opacity-15 w-[95%] pl-40 pr-40 rounded-md'>
                {card.selectedImages.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image.url}
                    alt="Image"
                    sx={{ border: '1px', borderRadius: '25px' }}
                    style={{}}
                    className="w-full h-full  rounded-3xl object-fill"
                  />
                ))}
              </div>
              <div className="text-base w-[1030px] ml-[7.5%] mt-3">
                {typeof card.blogText === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: `<div>${truncateText(card.blogText)}</div>` }} />
                ) : (
                  card.blogText
                )}
              </div>
            </div>
            <div className='mt-3 rounded-lg border-[#dad6d6]  bg-[#F1E8DE] w-[20%] h-96'>
              <div className=' '>
                <h1 className=' mb-3 m-2 p-1 text-xl font-semibold '>Recent Posts</h1>
                <div className="">
                  <div className=" ">
                    {data12.map((card, index) => (
                      <div key={index} >
                        <div className=" flex  border-[#d1c2c2] border bg-[#f9eded] m-2">
                          <div className="w-32 p-1 ">
                            {card.selectedImages.map((image, index) => (
                              <React.Fragment key={index}>
                                <td className="" style={{ fontSize: '1.2rem', color: '#555' }}></td>
                                <td className=" ">
                                  <img src={image.url} alt="Blog Image"
                                    className="  object-fill object-center rounded ml-2"
                                  />
                                </td>
                              </React.Fragment>
                            ))}
                          </div>
                          <div className='mt-2'>
                            <h2 className=" ml-3 text-lg font-medium ">{card.title}</h2>
                            <div className="text-base ml-3">{card.author}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>

  );
};

export default Blog;


