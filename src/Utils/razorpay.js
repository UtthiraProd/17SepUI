// utils/razorpay.js
export async function startRazorpayPayment(amount, onSuccess, onFailure) {
  const loadScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const scriptLoaded = await loadScript();

  if (!scriptLoaded) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  try {
    const res = await fetch('https://matapi-gcd0ewgnddbnfdf8.southindia-01.azurewebsites.net/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })  // you may need to send amount here
    });

    const data = await res.json();

    if (!data.id) {
      alert("Invalid Razorpay order ID");
      return;
    }

    const options = {
      key: "rzp_live_UqFswNzMWSBn8k",
      amount: data.amount,
      currency: "INR",
      name: "Utthira",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        onSuccess(response);
      },
      method: {
        upi: true
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function () {
          onFailure && onFailure("Payment cancelled by user.");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    console.error("Payment Error:", err);
    onFailure && onFailure("Something went wrong");
  }
}


// ✅ Separated reusable function for payment verification
export async function verifyRazorpayPayment(response) {
  try {
    const verifyRes = await fetch('https://matapi-gcd0ewgnddbnfdf8.southindia-01.azurewebsites.net/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      })
    });
    

 console.log('Status:', verifyRes.status);
    console.log('OK?:', verifyRes.ok);

    const result = await verifyRes.json();

    console.log('Result:', result); // ✅ Full JSON

console.log('result.success',result.success)
console.log('result.message',result.message)
    return result; // { success: true/false, message: "..."}
  } catch (err) {
    console.error("❌ Verification error:", err);
    return { success: false, message: "Verification API failed" };
  }
}