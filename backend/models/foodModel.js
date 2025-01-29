import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
});

export default mongoose.model("Food", foodSchema);