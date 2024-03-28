import React from 'react';

const Seat = () => {
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
      description: 'ok',
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
    }
    ,
    {
      imageUrl: 'destinations/POKHARA.jpg',
      // category: 'CATEGORY 3',
      title: 'Shooting Stars',
      description: 'ok',
      likes: '1.2K',
      comments: '6'
    }
  ];

  return (
    <section className="text-gray-600 body-font  bg-[#f5f5f5]">
      <div className="mr-24 ml-14 pt-10 pb-10 mt-20 ">
      
       
        <div className="flex  flex-wrap -m-" style={{ flexWrap: 'nowrap' }}>
          {cardData.map((card, index) => (
            <div key={index} className="flex bg" style={{ flex: '0 0 18.33%', marginRight: '30px' }}>
              <div className="h-full  shadow-lg shadow-[#a2b0b9] bg-[white] border-[#d2bebe] border-opacity-60 rounded-lg overflow-hidden">
                <div className='p-2  '>
                <img className="w-full rounded-xl  h-64 object-cover object-center" src={card.imageUrl} alt="blog" />

                </div>
                <div className=" mb-2 ">
              
                  <div className=" w-40 bg-[#b6cbca] pl-2  rounded-r-[50%] title-font text-lg font-medium text-gray-900 mb-3">{card.title}</div>

                 
                </div>
              </div>
            </div>
            
          ))}
        </div>
        
        
      </div>
    
    </section>
      
  );
};

export default Seat;


