import React, {useEffect, useState} from 'react';
import {useGetBlogMutation} from '../slices/blog'
import { useNavigate } from 'react-router-dom';
const Destinations = () => {


  const [blog] = useGetBlogMutation();
const [data11, setData11] = useState([ ]);
const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
}, []);


const blogDiv = (itemId) => {
  console.log(itemId)
  console.log("first")
  navigate(`/blog?Id=${itemId}`)
  setOpenItemId(itemId === openItemId ? null : itemId);
};

const fetchData = async () => {
    try {
        const result = await blog();
        const newData = result.data.data;

        console.log("Original data:", newData); // Log the original data
        // Create a copy of the newData array and then reverse it
        const reversedData = [...newData].reverse();
        console.log("Reversed data:", reversedData); // Log the reversed data
        // Set the reversed data in the state
        setData11(reversedData);


    } catch (error) {
        console.error('Failed to fetch schedules:', error);
    }
};

  return (
    <section className="text-gray-600 body-font bg-[#f5f5f5]">
      <div className=" ml-20 pt-10 pb-10 mt-20 ">
        <div className="flex flex-wrap  bg-red">
          {data11.map((card, index) => (
            <div key={index} className="w-[22%] h-full flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden mr-8 ">
              {/* <img className="w-full h-72 object-cover object-center" src={card.imageUrl} alt="Destinations" /> */}




              <div className="inline-block overflow-hidden ">
                {/*  */}
                <div className="group relative">

                {card.selectedImages.map((image, index) => (
  <React.Fragment key={index}>
    <td className="" style={{ fontSize: '1.2rem', color: '#555' }}></td>
    <td className="">
      <img src={image.url}     alt="Image"
       className="w-full  object-cover object-center transform rotate-15 scale-1.4 transition-transform duration-300 ease-in-out"
       style={{ transformOrigin: 'center center', transition: 'transform 0.9s ease-in-out' }}
       onMouseLeave={(e) => (e.target.style.transform = 'rotate(0) scale(1)')}
       onMouseEnter={(e) => (e.target.style.transform = 'rotate(15deg) scale(1.4)')}
      
      />
    </td>
  </React.Fragment>
))}
                  
                 
                  {/* <span className="absolute bg-[red] mr- bottom-0 w-32 rounded-ry-lg  text-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {card.title}
          </span> */}

                  <span className="  absolute  bottom-0 m rounded-ry-lg  text-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity   w-40 bg-[#b6cbca] pl-2  rounded-tr-[100px] shadow-lg shadow-[#9aa7cb] text-[#0f0f0f] title-font text-lg font-medium text-gray-900 -mb-14">{card.title}</span>

                </div>
              </div>

              <div className="p-6 ">
                <h2 className="text-lg font-medium text-gray-900 mb-3">{card.title}</h2>
                <p className="text-base leading-relaxed mb-3">{card.description}</p>
                <div className="flex items-center  justify-between">
                  {/* <a href="" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-[#009DF8]">Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a> */}
                  <button onClick={() => blogDiv(card._id)}>
                    Learn More
                  </button>
                  
                  <div className=''>
                <div className="text-base leading-relaxed ">{card.author}</div>
               
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default Destinations;


