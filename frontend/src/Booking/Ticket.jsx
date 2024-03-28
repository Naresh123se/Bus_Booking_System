import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const imageArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Uploaded Image ${index + 1}`}
            style={{ maxWidth: '50px', marginRight: '10px', marginBottom: '10px', display: 'inline-block' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
