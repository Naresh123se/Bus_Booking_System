import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Cancel = () => {
  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return null; // or return any JSX if needed
}

export default Cancel;
