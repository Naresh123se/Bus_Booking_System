// import React from 'react';

// const Seat = () => {
//   // Sample data for each card
//   const cardData = [
//     {
//       imageUrl: 'KK.jpg',
//       // category: 'CATEGORY 1',
//       title: 'The Catalyzer',
//       description: 'ok',
//       likes: '1.2K',
//       comments: '6'
//     },
//     {
//       imageUrl: 'KK.jpg',
//       // category: 'CATEGORY 2',
//       title: 'The 400 Blows',
//       description: 'ok',
//       likes: '1.2K',
//       comments: '6'
//     },
//     {
//       imageUrl: 'https://dummyimage.com/722x402',
//       // category: 'CATEGORY 3',
//       title: 'Shooting Stars',
//       description: 'ok',
//       likes: '1.2K',
//       comments: '6'
//     },
//     {
//       imageUrl: 'https://dummyimage.com/722x402',
//       // category: 'CATEGORY 3',
//       title: 'Shooting Stars',
//       description: 'ok',
//       likes: '1.2K',
//       comments: '6'
//     }
//     ,
//     {
//       imageUrl: 'https://dummyimage.com/722x402',
//       // category: 'CATEGORY 3',
//       title: 'Shooting Stars',
//       description: 'ok',
//       likes: '1.2K',
//       comments: '6'
//     }
//   ];

//   return (
//     <section className="text-gray-600 body-font">
//       <div className=" mr-24 ml-14 py-24 ">
//         <div className="flex flex-wrap -m-4" style={{ flexWrap: 'nowrap' }}>
//           {cardData.map((card, index) => (
//             <div key={index} className="flex "  style={{ display:'flex', gap: '10px', width: '20.33%' }}>
//               <div className="h-full ml-10 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
//                 <img className=" w-full  object-cover object-center" src={card.imageUrl} alt="blog" />
               
//                 <div className="p-6">
//                   {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{card.category}</h2> */}
//                   <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{card.title}</h1>
//                   {/* <p className="leading-relaxed mb-3">{card.description}</p> */}
//                   {/* <div className="flex items-center flex-wrap">
//                     <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
//                       <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M5 12h14"></path>
//                         <path d="M12 5l7 7-7 7"></path>
//                       </svg>
//                     </a>
//                     <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
//                       <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                         <circle cx="12" cy="12" r="3"></circle>
//                       </svg>{card.likes}
//                     </span>
//                     <span className="text-gray-400 inline-flex items-center leading-none text-sm">
//                       <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                         <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
//                       </svg>{card.comments}
//                     </span>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Seat;



import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    // Send the image to the backend (replace 'backendUrl' with your backend endpoint)
    const formData = new FormData();
    formData.append('image', selectedImage);

    fetch('backendUrl', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        // Handle response from backend if needed
        console.log('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload Image</button>
      <br />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Uploaded Image"
          style={{ maxWidth: '300px' }}
        />
      )}
    </div>
  );
};

export default Seat;
