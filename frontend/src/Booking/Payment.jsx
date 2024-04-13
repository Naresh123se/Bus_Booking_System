import React from 'react';
import Button from '@mui/joy/Button';
import { useInitiatePaymentMutation } from '../slices/khalti.js';

const PaymentButton = () => {
  const [khalti, { isLoading, isError, error }] = useInitiatePaymentMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await khalti({ amount: 5000 }).unwrap();
      redirectToKhalti(response);
    } catch (err) {
      console.error("Error occurred during payment initiation:", err);
      // Display error to the user
    }
  };

  const redirectToKhalti = (response) => {
    if (response && response.payment_url) {
      window.location = response.payment_url;
    } else {
      console.error("Invalid response from Khalti:", response);
      // Handle invalid response
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay with Khalti'}
      </Button>
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
};

export default PaymentButton;
