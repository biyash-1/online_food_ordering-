
import Food from "../models/foodModel.js";

// add food
 export const addFood = async (req, res) => {
  let image_filename = req.file ? req.file.filename : "undefined";

  const food = new Food({
    name: req.body.name,
    price: req.body.price,
    image: image_filename,
  });

  try {
    await food.save();
    res.status(201).json({
      food,
      message: "Food added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



