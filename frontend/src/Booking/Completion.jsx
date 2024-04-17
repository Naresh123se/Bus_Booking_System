import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Completion() {
  const [messageBody, setMessageBody] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (paymentStatus === 'succeeded') {
      paymentAlert(); // Call paymentAlert function if payment status is succeeded
    }
  }, [paymentStatus]);

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
      if (result.isConfirmed) {
        navigate('/') // Redirect to the home page
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
    </>
  );
}

export default Completion;
