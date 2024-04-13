import React from 'react';
import PayNow from '../Booking/PayNow';

const Destinations = () => {
  // Sample data for each card
  const cardData = [
    {
      imageUrl: 'destinations/man.png',
      // category: 'CATEGORY 1',
      title: 'The Catalyzer',
      description: 'ok',
      likes: '1.2K',
      comments: '6'
    },
    {
      imageUrl: 'destinations/pokhara.png',
      // category: 'CATEGORY 2',
      title: 'The 400 Blows',
      description: 'naresh',
      likes: '1.2K',
      comments: '6'
    },
    {
      imageUrl: 'destinations/sm.jpg',
      // category: 'CATEGORY 3',
      title: 'Shooting Stars',
      description: 'ok',
      likes: '1.2K',
      comments: '6'
    },
    {
      imageUrl: 'destinations/lumb.png',
      // category: 'CATEGORY 3',
      title: 'Shooting Stars',
      description: 'ok',
      likes: '1.2K',
      comments: '6'
    },
  ];

  return (
    <section className="text-gray-600 body-font bg-[#f5f5f5]">
      <div className=" ml-20 pt-10 pb-10 mt-20 ">
        <div className="flex flex-wrap  bg-red">
          {cardData.map((card, index) => (
            <div key={index} className="w-[22%] h-full flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden mr-8 ">
              {/* <img className="w-full h-72 object-cover object-center" src={card.imageUrl} alt="Destinations" /> */}

              <div className="inline-block overflow-hidden ">
                {/*  */}
                <div className="group relative">
                  <img
                    src={card.imageUrl}
                    alt="Image"
                    className="w-full h-72 object-cover object-center transform rotate-15 scale-1.4 transition-transform duration-300 ease-in-out"
                    style={{ transformOrigin: 'center center', transition: 'transform 0.9s ease-in-out' }}
                    onMouseLeave={(e) => (e.target.style.transform = 'rotate(0) scale(1)')}
                    onMouseEnter={(e) => (e.target.style.transform = 'rotate(15deg) scale(1.4)')}
                  />
                  {/* <span className="absolute bg-[red] mr- bottom-0 w-32 rounded-ry-lg  text-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {card.title}
          </span> */}

                  <span className="  absolute  bottom-0 m rounded-ry-lg  text-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity   w-40 bg-[#b6cbca] pl-2  rounded-tr-[100px] shadow-lg shadow-[#9aa7cb] text-[#0f0f0f] title-font text-lg font-medium text-gray-900 -mb-14">{card.title}</span>

                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-3">{card.title}</h2>
                <p className="text-base leading-relaxed mb-3">{card.description}</p>
                <div className="flex items-center">
                  <a href="#" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
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


