import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useConfirmationMutation } from '../slices/khalti.js';
import { toast } from 'react-toastify'
import { useSelseatMutation} from '../slices/seat.js';
import { useTicketMutation} from '../slices/ticket.js';

function Completion() {
  const [messageBody, setMessageBody] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState( );
  useEffect(() => {
    // Load Stripe promise
    const stripePromise = loadStripe('pk_test_51OuFwxRwfoVrnzomyIvjrX4FCfEYw7nR9zwl2ktkAdpuuoeTKCIhCEGRr22ls5hbi3FoMG0jR7yK3FA7ZvT7MoTX00EwcOa9pa');
    
    // Fetch payment intent status
    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      console.log('Client Secret:', clientSecret);
  
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      console.log('Payment Intent:', paymentIntent);
  
      const newMessageBody = error ? `> ${error.message}` : `> Payment ${paymentIntent.status}: ${paymentIntent.id}`;
      setMessageBody(newMessageBody);

      setPaymentStatus(paymentIntent.status);
    });
    // fetchData();
  }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await confirm({ pidx }).unwrap();
        setData(response.status);
        console.log(response)
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchData();
  },[]);
  useEffect(() => {
    if (paymentStatus === 'succeeded' || data === "Completed") 
     {
      submitHandler1();
      submitHandler();
      paymentAlert(); // Call paymentAlert function if payment status is succeeded
    }
  }, [paymentStatus, data]);

//khalti
const [confirm] = useConfirmationMutation();
  

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pidx = urlParams.get('pidx');
  const [Selseat] = useSelseatMutation();
  const [TicketData] = useTicketMutation();

  const paymentAlert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      color: "#716add",
      background: "#00000 url(ll.png)",
      title: "Payment Successfully",
      showConfirmButton: true,
      backdrop: `
        rgba(10,0,123,0.4)
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/ticket') // Redirect to the home page
      }
    });
  };

 const value = localStorage.getItem('allData');
 const data11 = JSON.parse(value)
console.log(data11)
 const submitHandler = async (e) => {
   
   try {
    await Selseat (data11).unwrap();
   } catch (err) {
     toast.error(err?.data?.message || err.error);
   }
 };

 const submitHandler1 = async (e) => {
   console.log("first")
   
   try {
    const response = await TicketData(data11).unwrap(); 
    localStorage.setItem('ticketDataResponse', JSON.stringify(response.ticket.ticketNum));
     console.log(response.ticket.ticketNum)
   } catch (err) { 
     toast.error(err?.data?.message || err.error);
   }
 };

 const Ticket = async (e) => {
   console.log("first")
 
   try {
    await Selseat (data11).unwrap();
console.log("first")
     // navigate('/login');
   } catch (err) {
     toast.error(err?.data?.message || err.error);
   }
 };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
      {/* <button onClick={submitHandler}>ok</button> */}
    </>
  );
}

export default Completion;
