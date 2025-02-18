"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "../stores/cartStore";
import { useDeliveryStore } from "../stores/deliveryStore";

const CheckoutPage = () => {
  const {  totalPrice } = useCartStore();
  const { deliveryInfo, setDeliveryInfo } = useDeliveryStore();
  const deliveryCharge = 5;
  const subtotal = totalPrice;

  
  const isFormValid = () => {
    return (
      deliveryInfo.firstName?.trim() &&
      deliveryInfo.lastName?.trim() &&
      deliveryInfo.email?.trim() &&
      deliveryInfo.address?.trim() &&
      deliveryInfo.city?.trim() &&
      deliveryInfo.postalCode?.trim() &&
      deliveryInfo.phone?.trim()
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Delivery Information Section */}
      <div className="p-3 rounded-lg mt-10">
        <h2 className="text-2xl text-center font-semibold mb-6">
          Delivery Information
        </h2>
        <form className="space-y-4">
          {/* First and Last Name */}
          <div className="flex space-x-2">
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              value={deliveryInfo.firstName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={deliveryInfo.lastName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={deliveryInfo.email}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={deliveryInfo.address}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryInfo.city}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={deliveryInfo.postalCode}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={deliveryInfo.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </form>
      </div>

      {/* Cart Total Section */}
      <div className="p-4 rounded-lg flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-6">Cart Total</h2>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between gap-12">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-12">
            <span>Delivery fee:</span>
            <span>${deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold gap-12">
            <span>Total:</span>
            <span>${(subtotal + deliveryCharge).toFixed(2)}</span>
          </div>
        </div>

        {/* Disable button if form is not valid */}
        <Link href={isFormValid() ? "/checkout/payment" : "#"} passHref>
          <Button
            className="mt-6 bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isFormValid()}
          >
            Proceed to Payment
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
