

import Order from "../models/orderModel.js";


export const createOrder = async (req, res) => {
  try {
    const { paymentMethod, orderAmount, orderItems, deliveryInfo } = req.body;
    const userId = req.user.id;
    console.log("user id",userId);
    
    if (!userId || !paymentMethod || !orderAmount || !orderItems || !deliveryInfo) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const order = new Order({
      userId,
      paymentMethod,
      orderAmount,
      orderItems,
      deliveryInfo
    })

     const savedOrder = await order.save();
     res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message || error });
  }
};


export const getOrders = async (req, res) => {
  try {
      // Check if the user is an admin
      const userId = req.user.id;
      if (!userId) {
          return res.status(401).json({ message: "Unauthorized" });
      }


   const orders = await Order.find({ userId })
   console.log("orders",orders);
     
      res.status(200).json({ orders });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error: error.message || error });
  }
};


export const getOrdersforadmin = async (req, res) => {
  try {
   
      if (req.user.role !== "admin") {
          return res.status(403).json({ message: "Access denied" });
      }


      console.log("admin id:", req.user.role);
     
      const orders = await Order.find();

     
      if (orders.length === 0) {
          return res.status(404).json({ message: "No orders found" });
      }

     
      res.status(200).json({ orders });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error: error.message || error });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('orderId in accept order function',orderId);
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = 'accepted'; 
    await order.save();
    res.status(200).json({ message: "Order accepted", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept order", error: error.message || error });
  }
};


export const rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('orderId in reject order function',orderId);
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = 'rejected'; // Set order status to 'Rejected'
    await order.save();
    res.status(200).json({ message: "Order rejected", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject order", error: error.message || error });
  }
};

export const pendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.countDocuments({ status: "pending" }); 
    res.json({ pendingOrders });
  } catch (err) {
    console.error("Error fetching pending orders:", err); 
    res.status(500).json({ error: "Internal server error" });
  }
};


 export const total_orders = async (req, res) =>{
    try{
      const orders = await Order.find();
      const total_orders = orders.length;
      res.status(200).json({total_orders});
    }catch(error){
    
      res.status(500).json({ message: "Failed to fetch orders", error: error.message || error });
    }
}

export const total_income = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({ status: "accepted" });
    console.log("accepted orders",orders);
    
    // Calculate the total income from the filtered orders
    const total_income = orders.reduce((total, order) => total + order.orderAmount, 0);

    // Respond with the total income
    res.status(200).json({ total_income });
  } catch (error) {
    // Handle any errors and respond with an appropriate message
    res.status(500).json({
      message: "Failed to fetch total income",
      error: error.message || error,
    });
  }
};

export const top_products = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Create an object to aggregate product data
    const productCounts = {};

    // Loop through each order and aggregate product data
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const productId = item.productId;
        const quantity = item.quantity || 1; // Default to 1 if no quantity is provided

        if (productCounts[productId]) {
          // If the product already exists, increment its quantity
          productCounts[productId].count += quantity;
        } else {
          // Otherwise, initialize the product data
          productCounts[productId] = {
            title: item.title, // Store the title for reference
            image: item.image, // Store the image URL for reference
            count: quantity, // Initialize the count with the current quantity
          };
        }
      });
    });

    // Sort products by count in descending order and select the top 4
    const topProducts = Object.entries(productCounts)
      .sort((a, b) => b[1].count - a[1].count) // Sort by count in descending order
      .slice(0, 4) // Select the top 4 products
      .map(([productId, data]) => ({
        productId,
        title: data.title,
        image: data.image,
        count: data.count, // Include the aggregated count
      }));

    // Respond with the top 4 products
    res.status(200).json({ topProducts });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch top products",
      error: error.message || error,
    });
  }
};
