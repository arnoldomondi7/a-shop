import mongoose from "mongoose"

//connect to the db.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    //LOG A SUCCESS MESSAGE.
    console.log(`MongoDB successfully connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Unable to connect because of : ${error.message}`)
    //exit the process.
    process.exit(1)
  }
}

export default connectDB
