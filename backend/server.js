import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import "dotenv/config";

// dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API working");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
