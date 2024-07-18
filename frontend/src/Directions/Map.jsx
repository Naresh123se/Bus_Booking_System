import React from 'react';

const Map = () => {
  return (
    <div className='ml-20 mt-10'>
 <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1681541846797!2d85.32819117485008!3d27.71209397617985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196de5da5741%3A0x652792640c70ede9!2sHerald%20College%20Kathmandu!5e0!3m2!1sen!2snp!4v1720932364321!5m2!1sen!2snp"
      width="1370"
      height="600"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
    ></iframe>
    </div>
   
  );
};

export default Map;
