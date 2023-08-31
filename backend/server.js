import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import productRoute from "./routes/productRoutes.js"
import userRoute from "./routes/userRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

//configure the system.
dotenv.config()

//create the port
const port = process.env.PORT || 5000

//connect to the database.
connectDB()

//initialise the express app.
const app = express()

//parse the json data.
app.use(express.json())

//parse the urlencoded data.
app.use(express.urlencoded({ extended: true }))

//parse the cookie
app.use(cookieParser())

//get the products.
app.use("/api/products", productRoute)

//get the user route.
app.use("/api/users", userRoute)

//get the order routes.
app.use("/api/orders", orderRouter)

//CREATE A PAYPAL ROUTE.
app.get("/api/config/paypal", (req, res) => {
  //we send the clients id.
  //clientid is in the backend for security reasons.
  return res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

//use the error handlers.
app.use(notFound)
app.use(errorHandler)

//start the server.
app.listen(port, error => {
  //handle the error.
  if (error) {
    return console.log("Server is unable to run")
  }

  //else show the success message.
  console.log(`Server is Running on port ${port}`)
})
