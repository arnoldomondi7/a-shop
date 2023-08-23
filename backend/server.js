import express from "express"
import dotenv from "dotenv"
import productRoute from "./routes/productRoute.js"
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

//create a test route.
app.get("/", (req, res) => {
  res.send("API is running fine...")
})

//get the products.
app.use("/api/products", productRoute)

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
