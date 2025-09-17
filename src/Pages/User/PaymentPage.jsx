import React from 'react';
import RazorpayGPayButton from '../../Components/RazorpayGPayButton';

const PaymentPage = () => {
  return (
    <div style={{ padding: '30px' }}>
      <h2>Pay with Google Pay / UPI</h2>
      <RazorpayGPayButton />
    </div>
  );
};

export default PaymentPage;
