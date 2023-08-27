import express from "express"
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js"

//create a route.
const productRouter = express.Router()

//get the api products.
productRouter.route("/").get(getAllProducts)
//get a single product.
productRouter.route("/:id").get(getSingleProduct)

//export the router.
export default productRouter
