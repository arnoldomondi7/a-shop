import express from "express"
import dotenv from "dotenv"
import prods from "./data/prods.js"
import connectDB from "./config/db.js"
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
//get the api products.
app.get("/api/products/", (req, res) => {
  res.json(prods)
})

//get a single product.
app.get("/api/products/:id", (req, res) => {
  const product = prods.find(prod => {
    return prod._id === req.params.id
  })

  res.json(product)
})
//start the server.
app.listen(port, error => {
  //handle the error.
  if (error) {
    return console.log("Server is unable to run")
  }

  //else show the success message.
  console.log(`Server is Running on port ${port}`)
})
