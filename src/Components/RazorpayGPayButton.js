import React from 'react';

const RazorpayGPayButton = () => {

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true); // Don't load again if already loaded
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Please check your connection.');
      return;
    }

    try {
      const res = await fetch('https://matapi-gcd0ewgnddbnfdf8.southindia-01.azurewebsites.net/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ amount: 1 })
      });

      const data = await res.json();

      if (!data.id) {
        alert('Invalid order data received from server.');
        return;
      }

      const options = {
        key: "rzp_live_UqFswNzMWSBn8k", // Replace with your actual Razorpay key_id
        amount: data.amount,
        currency: "INR",
        name: "Utthira",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally, send response to backend for verification
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function () {
            console.log("User closed the payment form.");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      // Razorpay Checkout must be opened in direct response to a user gesture
      paymentObject.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to create Razorpay order.');
    }
  };

  return (
    <div>
      <button onClick={handlePayment} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Pay with GPay / UPI (via Razorpay)
      </button>
    </div>
  );
};

export default RazorpayGPayButton;
