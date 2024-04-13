import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const Navigate = useNavigate(); // Initialize useHistory hook

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    // Perform payment based on the selectedPaymentMethod
    if (selectedPaymentMethod === 'card') {
      // Navigate to '/card' route
      Navigate('/card');
    } else if (selectedPaymentMethod === 'googlepay') {
      // Navigate to '/googlepay' route
      Navigate('/googlepay');
    } else {
      // No payment method selected
     
      toast.error('Please select a payment method'); // Display error toast

    }
  };

  return (
    <div>
      {/* Payment method selection */}
      <div className=''>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedPaymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
            className=''
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="googlepay"
            checked={selectedPaymentMethod === 'googlepay'}
            onChange={handlePaymentMethodChange}
          />
          Google Pay
        </label>
      </div>

      {/* Pay button */}
      <button onClick={handlePayment}>
        {selectedPaymentMethod === 'card' ? 'Pay with Card' : 'Pay with Google Pay'}
      </button>
    </div>
  );
};

export default PaymentComponent;
