import React, { useEffect, useState } from 'react';
import { useConfirmationMutation } from '../slices/khalti.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelseatMutation} from '../slices/seat.js';
import { toast } from 'react-toastify'

const PaymentCon = () => {
  
  const [confirm] = useConfirmationMutation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pidx = urlParams.get('pidx');
  const [Selseat] = useSelseatMutation();
  // {pidx == null ?  navigate('/') :''  }

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

  const value = localStorage.getItem('allData');
  const data11 = JSON.parse(value)
console.log(data11)
  const submitHandler = async (e) => {
    console.log("first")
    e.preventDefault();
    try {
     await Selseat (data11).unwrap();
console.log("first")
      // navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  };





  const paymentAlert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      color: "#716add",
      background: "#00000 url(ll.png)",
      title: "Payment Completed",
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
    // navigate('/') // Redirect to the home page
  }
});
};

console.log(data.status)
if (data.status) {
  paymentAlert();
} else {
  // Do nothing or handle another case
}


  return (
    <div>
      <button onClick={submitHandler}>ok</button>
      {/* <h1>pidx = {data.pidx}</h1>
      <h1>{data.total_amount}</h1>
      <span className='text-xl font-bold bg-[#3ae03a]'>{data.status}</span>
      <h1>{data.fee}</h1>
      <h1>{data.refunded ? 'TRUE' : 'FALSE'}</h1> */}
    
    </div>
  );
};

export default PaymentCon;
