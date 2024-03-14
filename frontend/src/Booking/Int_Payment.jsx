import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

const Int_Payment = () => {
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('/payment-intent', { amount: amount * 100, currency: 'usd' });
      const { clientSecret } = data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });
      if (result.error) {
        console.error('Error processing payment:', result.error.message);
      } else {
        console.log('Payment succeeded:', result.paymentIntent);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h2>Card Payment</h2>
      <label>
        Amount:
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <CardElement />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Int_Payment;
