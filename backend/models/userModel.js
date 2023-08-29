import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const { Schema, model } = mongoose

//create a userSchema.
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

// Match user entered password to hashed password in database
//used when logging in.
//creates a method(function) called matchPassword.
//this will be used during authentication process.
userSchema.methods.matchPassword = async function (enteredPassword) {
  //bcrypt.compare -> is a method that compares the entered pwd and saved pwd.
  //its an async function.
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
//pre-> before its saved in the db.
//post -> happens after.
userSchema.pre("save", async function (next) {
  //if password has not been modified, go on to the next step.
  if (!this.isModified("password")) {
    next()
  }
  //if so, salt the password.
  const salt = await bcrypt.genSalt(10)

  //hash the entered password.
  this.password = await bcrypt.hash(this.password, salt)
})

const User = model("User", userSchema)

export default User
