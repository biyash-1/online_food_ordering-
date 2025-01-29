"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const router = useRouter();

  const handleViewOrders = () => {
    router.push("/orderconfirmation/orderhistory"); // Redirect to the order history page
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 min-h-screen">
      <div className="w-full max-w-md shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Order Placed Successfully!</h2>
        <p className="text-gray-600 text-center mb-6">
          Your order has been placed successfully. Thank you for shopping with us!
        </p>
        
        <button
          onClick={handleViewOrders}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
