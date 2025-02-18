import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    mealType: String
});

export default mongoose.model("Food", foodSchema);