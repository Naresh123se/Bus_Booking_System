import React, { useState, useEffect } from 'react';
// import './App.css';

function App() {
  const [stripeKey, setStripeKey] = useState('');

  useEffect(() => {
    async function fetchStripeKey() {
      try {
        const response = await fetch('/api/stripe-key');
        const data = await response.json();
        setStripeKey(data.key);
      } catch (error) {
        console.error('Error fetching Stripe key:', error.message);
      }
    }

    fetchStripeKey();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment', { method: 'POST' });
      const data = await response.json();
      console.log('Payment Intent:', data.paymentIntent);
      // Handle success, redirect user to payment page, etc.
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Stripe Payment</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}

export default App;
