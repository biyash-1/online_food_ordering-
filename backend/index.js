import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import connectToDatabase from "./dbCon.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import foodRoute from "./routes/foodRoute.js";

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);



// Middleware
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
// app.use('/api/food', foodRoute);
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/food", foodRoute);

// Connect to database
connectToDatabase();

// Test route
app.get("/", (req, res) => {
  res.json({ msg: "Backend started successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
