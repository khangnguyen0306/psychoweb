import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from '../assets/image/success.png'; // Update the path based on your actual image location

const PaymentConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={successImage} alt="Payment Success" className="w-24 h-24 mb-4" />
      <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">Thank you for your payment.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentConfirmation;
