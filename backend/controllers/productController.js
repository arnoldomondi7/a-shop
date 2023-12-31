import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  //create the max pagination limit.
  const pageSize = process.env.PAGINATION_LIMIT
  //target the page number in the url.
  const page = Number(req.query.pageNumber) || 1
  //handle the search querry.
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          // case insensitive
          $options: "i",
        },
      }
    : {}
  //get the total number of pages.
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  //get info from the frontend.
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id, //loged in user.
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  //get the data that is to be updated.
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  //find the product by id.
  const product = await Product.findById(req.params.id)
  //check if its there.
  if (product) {
    //if its there, update the items.
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    //save the updated products
    const updatedProduct = await product.save()
    //send res to frontend
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  //get the rating and comment from the body.
  //number rating and text coment.
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  //check if the product exist.
  if (product) {
    //check if its already reviewed.
    //to avoid same user giving 2 reviews.
    //finding through reviews not product.
    const alreadyReviewed = product.reviews.find(
      //matching the users objectID to the loged in user id
      //if same find it.
      review => review.user.toString() === req.user._id.toString()
    )
    //if reviewd send err
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }
    //if not take the comment
    //create the review object.
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id, //comes from the request object.
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
}
