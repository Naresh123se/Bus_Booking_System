import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import CryptoJS from 'crypto-js';


import { useInitiatePaymentMutation } from '../slices/khalti.js';

const PayNow = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const Navigate = useNavigate(); // Initialize useHistory hook
    const [khalti, { isLoading, isError, error }] = useInitiatePaymentMutation();
    const handlePaymentMethodChange = (event) => {
      setSelectedPaymentMethod(event.target.value);
    };

// 
    const redirectToKhalti = (response) => {
      if (response && response.payment_url) {
        window.location = response.payment_url;
      } else {
        console.error("Invalid response from Khalti:", response);
        // Handle invalid response
      }
    }
  
    //price ...
    const encryptedPrice = CryptoJS.AES.encrypt(JSON.stringify(totalPrice), 'BUS2024').toString();
localStorage.setItem('finalPrice', encryptedPrice);
console.log("hi",totalPrice)

//     const [decryptedBytes, setDecryptedBytes] = useState('');
//    // Retrieve the encryptedPrice from localStorage
// const encryptedPrice = localStorage.getItem('finalPrice');
// console.log('Encrypted Price:', encryptedPrice);
// // Decrypt the totalPrice when retrieving it
// const decrypted = CryptoJS.AES.decrypt(encryptedPrice, 'BUS2024');
// const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

// Parse the decrypted result as JSON

console.log(decryptedData)
    const handleClick = async (e) => {
      if (e) {
        e.preventDefault();
      }
      try {
        const response = await khalti({ amount: decryptedData ,customerName:customerName, customerEmail:customerEmail,customerPhone:customerPhone }).unwrap();
        redirectToKhalti(response);
      } catch (err) {
        console.error("Error occurred during payment initiation:", err);
        // Display error to the user
      }
    };


// Use the decryptedPrice as needed
// Example: console.log(decryptedPrice);

    
    const handlePayment = (e) => {
      // Perform payment based on the selectedPaymentMethod
      if (selectedPaymentMethod === 'card') {
         // Pass the event parameter to handleClick
      } else if (selectedPaymentMethod === 'Khalti') {
        handleClick(e);
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
                value="Khalti"
                checked={selectedPaymentMethod === 'Khalti'}
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
  

