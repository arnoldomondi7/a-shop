import express from "express"
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js"

//create a route.
const router = express.Router()

//get the api products.
router.route("/").get(getAllProducts)
//get a single product.
router.route("/:id").get(getSingleProduct)

//export the router.
export default router
