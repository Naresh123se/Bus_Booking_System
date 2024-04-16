import React, { useState } from 'react';

const Extra = () => {
  const [voucher, setVoucher] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to send the voucher to the server or apply it directly
    // For now, let's just set discountApplied to true
    setDiscountApplied(true);
  };

  return (
    <>
      {!discountApplied && (
        <form onSubmit={handleSubmit}>
          <label>
            Enter Voucher Code:
            <input type="text" value={voucher} onChange={handleVoucherChange} />
          </label>
          <button type="submit">Apply Voucher</button>
        </form>
      )}
      {discountApplied && voucher.trim() !== '' && voucher.trim() !== '0' && (
        <div className='flex'> 
          <div className='flex w-full'>
            <p>Discount Amount: </p>
          </div>
          <div className='flex justify-end w-full'>
            {/* Here you can display the discount amount or a message indicating the voucher was applied */}
            {/* For now, let's just display a message */}
            <p>Voucher applied successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Extra;
