// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["creditCard", "cashOnDelivery"],
    required: true,
  },
  orderAmount: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      reviewCount: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  deliveryInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type:String,
    enum:['pending','accepted','rejected'],
    default:'pending'
  }
});

export default mongoose.model("Order", orderSchema);
