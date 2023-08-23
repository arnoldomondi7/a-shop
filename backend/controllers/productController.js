import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

//@desc->getting all the products.
//@route->GET /api/products
//@access-> public (everyone)
const getAllProducts = asyncHandler(async (req, res) => {
  //await all products.
  const products = await Product.find({})

  if (products) {
    return res.status(200).json(products)
  }
  res.status(400)
  throw new Error("Product Not Found")
})

//@desc-> Get a single product by the id.
//@route-> GET /api/productd/:id
//@access-> public (everyone)
const getSingleProduct = asyncHandler(async (req, res) => {
  //to get a single products
  //target the id-> thats in the params
  const product = await Product.findById(req.params.id)

  if (product) {
    return res.status(200).json(product)
  }

  res.status(400)
  throw new Error("Products Not Found")
})

export { getAllProducts, getSingleProduct }
