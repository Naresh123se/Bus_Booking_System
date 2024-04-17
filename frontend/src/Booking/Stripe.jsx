import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Directions/Loader';
import { Elements, useStripe, useElements, LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OuFwxRwfoVrnzomyIvjrX4FCfEYw7nR9zwl2ktkAdpuuoeTKCIhCEGRr22ls5hbi3FoMG0jR7yK3FA7ZvT7MoTX00EwcOa9pa');

function Payment() {
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState('10');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaying, setIsPaying] = useState(false); // Add loading state

  useEffect(() => {
    handlePayment();
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const handlePayment = async () => {
    try {
      setIsPaying(true); // Set loading state to true
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      const secret = data.client_secret;
      setClientSecret(secret);
      setPaymentMessage('😊');
      setShowPaymentForm(true);
    } catch (error) {
      setPaymentMessage('Payment failed');
    } finally {
      setIsPaying(false); // Set loading state to false after payment attempt
    }
  };

  return (
    <>
      <div>
        <h1>Make a Payment</h1>
        {paymentMessage && <p>{paymentMessage}</p>}
      </div>
      <div>
        {showPaymentForm && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
}

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  return (
    <form id="payment-form" className="border border-gray-200 rounded p-4 shadow" onSubmit={handleSubmit}>
      <LinkAuthenticationElement />
      <PaymentElement />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"> <Loader /></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default Payment;
