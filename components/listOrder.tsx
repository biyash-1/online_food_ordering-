import { useEffect, useState } from "react";

interface Order {
  _id: string;
  userId: string;
  username: string;
  paymentMethod: string;
  orderAmount: number;
  currency: string;
  orderItems: {
    productId: string;
    title: string;
    quantity: number;
    price: string;
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
  status: string; // Add status to track each order's status
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

        setOrders(data.orders); // Assumes API returns { orders: [...] }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (orderId: string) => {
    console.log(`Order ${orderId} accepted`);
    try {
      const response = await fetch(`http://localhost:3001/api/order/accept/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Order accepted:", data);

      // Update the status of the specific order in the state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "accepted" } : order
        )
      );
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };

  const handleReject = async (orderId: string) => {
    console.log(`Order ${orderId} rejected`);
    try{
      const response = await fetch(`http://localhost:3001/api/order/reject/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Order rejected:", data);
      setOrders((prevOrders) =>
         prevOrders.map((order) => orderId === order._id?{...order,status:'rejected'}:order

        )
      )
    }
    catch (error) {
      console.error("Failed to reject order:", error);
    }
  };

  return (
    <div className="p-4 rounded shadow">
      <h3 className="text-2xl font-semibold mb-4">Orders List</h3>
      <div className="overflow-y-auto max-h-[500px] border border-gray-300 rounded">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Payment Method</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Delivery Info</th>
              <th className="border border-gray-300 px-4 py-2">Order Items</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {order._id.slice(0, 4)}...
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.deliveryInfo.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paymentMethod}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.orderAmount} {order.currency}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.deliveryInfo.firstName} {order.deliveryInfo.lastName}
                    <br />
                    {order.deliveryInfo.address}, {order.deliveryInfo.city}
                    <br />
                    Email: {order.deliveryInfo.email}
                    <br />
                    Phone: {order.deliveryInfo.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-2 py-1">
                            Product
                          </th>
                          <th className="border border-gray-300 px-2 py-1">
                            Quantity
                          </th>
                          <th className="border border-gray-300 px-2 py-1">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item.productId}>
                            <td className="border border-gray-300 px-2 py-1">
                              {item.title}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              {item.quantity}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-gray-300 h-full">
                    {order.status === "accepted" ? (
                      <div className="flex items-center justify-center gap-2 px-2">
                        <p className="bg-green-300 px-2 rounded-3xl">Accepted</p>
                      </div>
                    ) :  order.status === "rejected" ? (
                      <div className="flex items-center justify-center gap-2 px-2">
                        <p className="bg-red-300 px-2 py-1 rounded-3xl text-sm font-medium">Rejected</p>
                      </div>
                    ) :(
                      <div className="flex items-center justify-center gap-2 px-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                          onClick={() => handleAccept(order._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleReject(order._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
