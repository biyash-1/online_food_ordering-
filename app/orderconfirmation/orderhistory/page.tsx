"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  paymentMethod: string;
  orderAmount: number;
  orderItems: Array<{ title: string; quantity: number; reviewCount: number }>;
  status: string;
  createdAt: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/order/list", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        console.log("Orders fetched:", data);

        // Sort orders by creation date in descending order
        const sortedOrders = data.orders.sort(
          (a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen ">
      <div className="w-full max-w-4xl shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border-b-2 pb-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">
                    Order ID: {order._id.slice(0, 5)}{" "}
                    <span className="text-sm text-gray-500">
                      (You can track your order using this ID)
                    </span>
                  </h3>
                  <div>
                    <h1>
                      Order date:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Order status:</span>
                    <span
                      className={`px-3 py-1 text-sm rounded-lg ${
                        order.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : order.status === "accepted"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Payment Method Display */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm">
                    Payment Method: {order.paymentMethod}
                  </h4>
                </div>

                {/* Table for Order Items */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Order Items:</h4>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Item Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Price
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-2 text-sm">{item.title}</td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm">
                            ${item.reviewCount}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            ${item.reviewCount * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-2 text-sm font-medium text-right"
                        >
                          <strong>Total Amount:</strong>
                        </td>
                        <td className="px-4 py-2 ">${order.orderAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
