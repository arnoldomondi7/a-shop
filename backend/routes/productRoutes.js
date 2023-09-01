import express from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import checkObjectId from "../middleware/checkObjectId.js"

const productRouter = express.Router()

productRouter.route("/").get(getProducts).post(protect, admin, createProduct)
productRouter
  .route("/:id/reviews")
  .post(protect, checkObjectId, createProductReview)
productRouter.get("/top", getTopProducts)
productRouter
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

//export the router.
export default productRouter
