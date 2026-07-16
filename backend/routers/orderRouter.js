import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/my-orders", getMyOrders);
orderRouter.get("/:orderId", getOrderById);
orderRouter.put("/:orderId/status", updateOrderStatus);

export default orderRouter;