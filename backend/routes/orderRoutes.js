import express from "express"
const orderRouter = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

orderRouter
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders)
orderRouter.route("/mine").get(protect, getMyOrders)
orderRouter.route("/:id").get(protect, getOrderById)
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid)
orderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)

export default orderRouter
