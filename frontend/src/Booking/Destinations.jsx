import React from 'react';

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
  ];

  return (
    <>
      <section className="text-gray-600 body-font bg-[#f5f5f5]">
        <div className="mr-24 ml-20 pt-10 pb-10 mt-20">
          <div className="grid grid-cols-4 gap-10">

            {cardData.map((card, index) => (
              <div className={`border-[#d2bebe] border-opacity-60 rounded-lg overflow-hidden ${index === 1 || index === 3 ? 'mt-8' : ''}`}>
                <div key={index} className="relative overflow-hidden rounded-lg border border-[#d2bebe] border-opacity-60">
                  <img
                    src={card.imageUrl}
                    alt="Destinations"
                    className="w-full h-96 object-cover object-center opacity-90 transform scale-100 transition-transform duration-300 ease-in-out"
                    style={{ transformOrigin: 'center center', transition: 'transform 0.8s ease-in-out' }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div>
                  </div>
                  <div className='absolute top-[93%] grid place-self-end bg-[#090a0a] rounded-r-xl opacity-80 text-lg '>
                    <span className='opacity-100 text-[white] pr-2 rounded-xl'>
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

};

export default Destinations;
