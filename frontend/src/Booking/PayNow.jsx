import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';

const PayNow = () => {
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
  
    // Check if a payment method is selected
    const isPaymentMethodSelected = selectedPaymentMethod !== '';
  
    return (
      <div>
        {/* Payment method selection */}
        <div className='flex'>
          <div className=' ml-10 flex border rounded-xl p-1.5 border-[#a8c0d7] shadow-lg bg-[#FAFBFC]'>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedPaymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
                className='size-5 mr-2 mt-1'
              />
            </label>
            <img src="/Card/Card.svg" alt="Card"  className='mr-10'/>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="googlepay"
                checked={selectedPaymentMethod === 'googlepay'}
                onChange={handlePaymentMethodChange}
                className='size-5 mr-2 mt-1'
              />
            </label>
            <img src="/Card/Khalti.svg" style={{ width: '80px' }} alt="Card" />
          </div>
        </div>
  
        {/* Pay button */}
        {isPaymentMethodSelected && (
          <div className='mt-5  flex justify-center '>
            <Button className=''
  onClick={handlePayment}
  sx={{
    width: '300px',
    bgcolor: selectedPaymentMethod === 'card' ? '#009DF8' : '#3D1060', // Change color based on the selected payment method
    '&:hover': {
      bgcolor: selectedPaymentMethod === 'card' ? '#0077C9' : '#472e82', // Change color on hover based on the selected payment method
    },
  }}
>
  {selectedPaymentMethod === 'card' ? 'Pay with Card' : 'Pay with Khalti'}
</Button>

          </div>
        )}
      </div>
    );
  };
  
  export default PayNow;
  

