import mongoose from "mongoose"
const { Schema, model } = mongoose

//create the reviewSchema.
const reviewSchema = new Schema(
  {
    //create a relationship between a user and the products.
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
)

//create a product schema.
const productSchema = new Schema(
  {
    //create a relationship between a user and the products.
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const Product = model("Product", productSchema)

export default Product
