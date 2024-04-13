import React, { useEffect, useState } from 'react';
import { useConfirmationMutation } from '../slices/khalti.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const PaymentCon = () => {
  
  const [confirm] = useConfirmationMutation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pidx = urlParams.get('pidx');

  {pidx == null ?  navigate('/') :''  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await confirm({ pidx }).unwrap();
        setData(response);
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchData();
    
  }, []);



  const paymentAlert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      color: "#716add",
      background: "#00000 url(ll.png)",
      title: "Your work has been saved",
      showConfirmButton: true,
      
     
      backdrop: `
      rgba(10,0,123,0.4)
   
    left top
    no-repeat
  `
}).then((result) => {
  // If the "OK" button is clicked, redirect to the home page
  if (result.isConfirmed) {
    // console.log("first")
    navigate('/') // Redirect to the home page
  }
});
};

{data.status ? paymentAlert():''}

  return (
    <div>
      {/* <h1>pidx = {data.pidx}</h1>
      <h1>{data.total_amount}</h1>
      <span className='text-xl font-bold bg-[#3ae03a]'>{data.status}</span>
      <h1>{data.fee}</h1>
      <h1>{data.refunded ? 'TRUE' : 'FALSE'}</h1> */}
    
    </div>
  );
};

export default PaymentCon;
