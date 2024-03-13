// React frontend (PaymentForm.js)
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const initiatePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/payment', {
        amount: amount,
        productIdentity: '123', // Example product ID
        productName: 'Test Product', // Example product name
        // Add other required parameters here
      });

      setPaymentUrl(response.data.paymentUrl);
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={initiatePayment} disabled={loading}>Initiate Payment</button>
      {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}
    </div>
  );
};

export default PaymentForm;
