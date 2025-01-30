import { useEffect, useState } from "react";

interface Order {
  _id: string;
  userId: string;
  username: string;
  paymentMethod: string;
  orderAmount: number;
  currency: string;
  createdAt: string; // Added order date field
  orderItems: {
    productId: string;
    title: string;
    quantity: number;
    reviewCount: string;
  }[];
  deliveryInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  status: string;
}

const ListOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/order/listadmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log("Orders fetched:", data);
        setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/accept/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: "accepted" } : order))
      );
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };

  const handleReject = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/reject/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: "rejected" } : order))
      );
    } catch (error) {
      console.error("Failed to reject order:", error);
    }
  };

  return (
    <div className="p-4 rounded shadow w-full">
      <h3 className="text-2xl font-semibold mb-4">Orders List</h3>
      <div className="overflow-x-auto border border-gray-300 rounded w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Payment</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Delivery Info</th>
              <th className="border border-gray-300 px-4 py-2">Order Items</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 px-4 py-2">{order._id.slice(0, 6)}...</td>
                  <td className="border border-gray-300 px-4 py-2">{order.deliveryInfo.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.orderAmount} {order.currency}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.deliveryInfo.address}, {order.deliveryInfo.city}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-2 py-1">Product</th>
                          <th className="border border-gray-300 px-2 py-1">Qty</th>
                          <th className="border border-gray-300 px-2 py-1">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item.productId}>
                            <td className="border border-gray-300 px-2 py-1">{item.title}</td>
                            <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                            <td className="border border-gray-300 px-2 py-1">{item.reviewCount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {order.status === "accepted" ? (
                      <p className="bg-green-300 px-2 rounded-3xl">Accepted</p>
                    ) : order.status === "rejected" ? (
                      <p className="bg-red-300 px-2 rounded-3xl">Rejected</p>
                    ) : (
                      <div className="flex gap-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 rounded" onClick={() => handleAccept(order._id)}>Accept</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-2 rounded" onClick={() => handleReject(order._id)}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
