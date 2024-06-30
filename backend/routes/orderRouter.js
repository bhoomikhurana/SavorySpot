import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { placeorder, userOrders } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeorder);
orderRouter.post("/userorders", authMiddleware, userOrders);
export default orderRouter;
