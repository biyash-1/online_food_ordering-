"use client";

import React from "react";
import { useCartStore } from "./../stores/cartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartPage = () => {
  const { items, totalPrice, removeFromCart } = useCartStore();
  const deliveryCharge = 5; // Define your delivery charge here
  const subtotal = totalPrice; // Assuming totalPrice represents the subtotal

  return (
    <div className="container mx-auto py-2 px-4 md:px-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Shopping Cart</h1>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.reviewCount}</p>
                </div>
              </div>
              <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>
          ))}

          {/* Cart Total Section */}
        {/* Cart Total Section */}
<div className="border-t border-gray-300 mt-6 pt-2 w-[30%]">
  <h2 className="text-xl font-semibold">Cart Total</h2>
  <hr className="border-gray-300 my-2" />
  <div className="flex flex-col space-y-2">
    <div className="flex justify-between gap-12">
      <span>Subtotal:</span>
      <span>${subtotal.toFixed(2)}</span> {/* Display subtotal */}
    </div>
    <div className="flex justify-between items-start gap-5 ">
      <span>Delivery fee:</span>
      <span>${deliveryCharge.toFixed(2)}</span> {/* Display delivery charge */}
    </div>
    <div className="flex justify-between items-start gap-12 font-bold">
      <span>Total:</span>
      <span>${(subtotal + deliveryCharge).toFixed(2)}</span> {/* Calculate total */}
    </div>
  </div>
</div>

          <div className="flex items-center justify-start mt-4">
            <Link href="/checkout">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is currently empty.</p>
      )}
    </div>
  );
};

export default CartPage;
