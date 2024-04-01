import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddDeccMutation } from '../slices/destinations.js';



const Ticket = () => {
  const [place, setPlace] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  // const [postStatus, setStatus] = useState(false);
  const [addDecc] = useAddDeccMutation(); // Hook for deleting schedule

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const createPost = async (postData) => {
  //   // Simulated API call or upload process
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulated success response
  //       resolve({ success: true });
  //       // Simulated error response
  //       // reject(new Error("Failed to create post"));
  //     }, 1000);
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('place', place);
    selectedImages.forEach((image, index) => {
      data.append(`selectedImages[${index}]`, image);
    });
    // data.append('status', postStatus);

    try {
      const response = await addDecc(data);
      if (response.success) {
        toast.success('Post Created Successfully');
        setPlace('');
        setSelectedImages([]);
        // setStatus(false);
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <br />
      <div>
        <label className="pb-2">
          Place <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="place"
          value={place}
          className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setPlace(e.target.value)}
          placeholder="place"
          required
        />
      </div>

      <div className="mt-4">
        <label className="pb-2">Upload Images</label>
        <input
          type="file"
          name="selectedImages"
          id="upload"
          className=""
          multiple
          onChange={handleImageChange}
        />

        <div className="w-full flex items-center flex-wrap">
          {selectedImages.map((i, index) => (
            <img
              src={i}
              key={index}
              alt=""
              className="h-[120px] w-[120px] object-cover m-2"
            />
          ))}
        </div>
        <br />
        <div className="flex items-center mb-4">
         
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-Roboto font-medium text-gray-900"
          >
            Private
          </label>
        </div>

        <div className="mt-4">
          <input
            type="submit"
            value="Upload"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </form>
  );
};

export default Ticket;
