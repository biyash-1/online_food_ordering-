"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCartStore } from "../../stores/cartStore";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegCreditCard } from "react-icons/fa";
import { SiEsea } from "react-icons/si";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, totalPrice } = useCartStore();
  const { deliveryInfo } = useDeliveryStore();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  const DELIVERY_CHARGE = 5;
  const totalAmount = totalPrice + DELIVERY_CHARGE;

  // Check for failed payment status
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'failed') {
      toast.error('Payment failed or was cancelled. Please try again.');
    }
  }, [searchParams]);

  const mapOrderItems = () => {
    return items.map(({ id, title, reviewCount, quantity, image }) => ({
      productId: id,
      title,
      reviewCount,
      quantity,
      image,
    }));
  };

  const BASE_URL = "http://localhost:3001";

  const handleCreditCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderItems = mapOrderItems();
      const response = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "creditCard",
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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEsewaPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // First, create order in your backend
      const orderItems = mapOrderItems();
      const orderResponse = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "esewa",
          orderAmount: totalAmount,
          orderItems,
          deliveryInfo,
          status: "pending", // Set initial status as pending
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.orderId || `ORDER-${Date.now()}`;

      // Initiate eSewa payment
      const esewaResponse = await fetch('/api/esewa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: totalAmount,
        }),
      });

      if (!esewaResponse.ok) {
        throw new Error('Failed to initiate eSewa payment');
      }

      const { paymentData, paymentUrl } = await esewaResponse.json();

      // Create and submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error during eSewa payment:", error);
      toast.error("Failed to initiate eSewa payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    setIsProcessing(true);

    try {
      const orderItems = mapOrderItems();
      const response = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "cashOnDelivery",
          orderAmount: totalAmount,
          orderItems,
          deliveryInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      toast.success("Order placed successfully!");
      useCartStore.getState().clearCart();
      router.push("/orderconfirmation");
    } catch (error) {
      console.error("Error during COD order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCreditCardForm = () => (
    <form className="space-y-4" onSubmit={handleCreditCardPayment}>
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-600 font-medium mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-600 font-medium mb-1">CVC</label>
          <input
            type="text"
            placeholder="123"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );

  const renderEsewaPayment = () => (
    <form className="space-y-4" onSubmit={handleEsewaPayment}>
      <div className="text-center py-4">
        <p className="text-gray-600 mb-4">
          You will be redirected to <strong>eSewa</strong> to complete your payment securely.
        </p>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
          <span>Amount to pay:</span>
          <span className="font-bold text-green-600">NPR {totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? "Redirecting..." : "Pay with eSewa"}
      </button>
    </form>
  );

  const renderCashOnDelivery = () => (
    <div className="text-center">
      <p className="text-gray-600">
        You have chosen <strong>Cash on Delivery</strong>.
      </p>
      <button
        onClick={handleCashOnDelivery}
        disabled={isProcessing}
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
      >
        {isProcessing ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-3 min-h-screen">
      <div className="w-full max-w-md shadow-lg rounded-lg p-6 border-2">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Payment Information
        </h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Select Payment Method
          </label>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setPaymentMethod("esewa")}
              className={`${
                paymentMethod === "esewa"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              } flex items-center justify-center border-2 p-3 rounded-md focus:outline-none hover:border-green-500`}
            >
              <div className="text-center mr-2 text-xl">
                <SiEsea />
              </div>
              eSewa
            </button>
            <button
              onClick={() => setPaymentMethod("creditCard")}
              className={`${
                paymentMethod === "creditCard"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              } flex items-center justify-center border-2 p-3 rounded-md focus:outline-none hover:border-blue-500`}
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
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              } flex items-center justify-center border-2 p-3 rounded-md focus:outline-none hover:border-blue-500`}
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        {/* Render Payment Form */}
        {paymentMethod === "esewa" && renderEsewaPayment()}
        {paymentMethod === "creditCard" && renderCreditCardForm()}
        {paymentMethod === "cashOnDelivery" && renderCashOnDelivery()}
      </div>
    </div>
  );
};

export default PaymentPage;