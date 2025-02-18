"use client";

import React, { useState } from "react";
import { useCartStore } from "../../stores/cartStore";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaRegCreditCard } from "react-icons/fa";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const { items, totalPrice } = useCartStore();
  const { deliveryInfo } = useDeliveryStore();
  const router = useRouter();

  const DELIVERY_CHARGE = 5;
  const totalAmount = totalPrice + DELIVERY_CHARGE;

  const mapOrderItems = () => {
    return items.map(({ id, title, reviewCount, quantity, image }) => ({
      productId: id,
      title,
      reviewCount,
      quantity,
      image,
    }));
  };
  const BASE_URL = process.env.MODE === "development" ? "http://localhost:3001" : (process.env.NEXT_PUBLIC_API_URL as string) 
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderItems = mapOrderItems();
      console.log("Final Order Details:", {
        paymentMethod,
        totalAmount,
        deliveryInfo,
        orderItems,
      });

      const response = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          paymentMethod,
          orderAmount: totalAmount,
          orderItems,
          deliveryInfo,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      toast.success("Order placed successfully!");
      useCartStore.getState().clearCart();
      router.push("/orderconfirmation");
    } catch (error) {
      console.error("Error during payment processing:", error);
      toast.error("Failed to process payment. Please try again.");
    }
  };

  const renderCreditCardForm = () => (
    <form className="space-y-4" onSubmit={handlePayment}>
      <div>
        <label className="block text-gray-600 font-medium mb-1">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-600 font-medium mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            // pattern="(0[1-9]|1[0-2])\/\\d{2}"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-600 font-medium mb-1">CVC</label>
          <input
            type="text"
            placeholder="123"
            // pattern="\\d{3}"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
      >
        Pay Now
      </button>
    </form>
  );

  const renderCashOnDelivery = () => (
    <div className="text-center">
      <p className="text-gray-600">
        You have chosen <strong>Cash on Delivery</strong>.
      </p>
      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 mt-4"
      >
        Confirm Order
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-3 min-h-screen">
      <div className="w-full max-w-md shadow-lg rounded-lg p-6 border-2">
        <h2 className="text-2xl font-semibold mb-2 text-center">Payment Information</h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Select Payment Method</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod("creditCard")}
              className={`${
                paymentMethod === "creditCard"
                  ? "border-blue-500"
                  : "border-gray-300"
              } flex items-center justify-center border p-3 rounded-md w-1/2 focus:outline-none hover:border-blue-500`}
            >
              <div className="text-center mr-2">
              <FaRegCreditCard />
              </div>
              Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod("cashOnDelivery")}
              className={`${
                paymentMethod === "cashOnDelivery"
                  ? "border-blue-500"
                  : "border-gray-300"
              } flex items-center justify-center border p-3 rounded-md w-1/2 focus:outline-none hover:border-blue-500`}
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        {/* Render Payment Form */}
        {paymentMethod === "creditCard" && renderCreditCardForm()}
        {paymentMethod === "cashOnDelivery" && renderCashOnDelivery()}
      </div>
    </div>
  );
};

export default PaymentPage;
