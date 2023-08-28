import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"
import User from "../models/userModel.js"

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Read JWT from the 'jwt' cookie.
  //store the info in the variable.
  //use jwt because the token is set as jwt.
  token = req.cookies.jwt

  if (token) {
    try {
      //get the users id via the verify method.
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //add the userID in the request object.
      //so the userId will be on the req object in all the routes.
      req.user = await User.findById(decoded.userId).select("-password")
      //once the request is through go on to the noxt job.
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// User must be an admin
const admin = (req, res, next) => {
  //check if the user is admin.
  //then grant access.
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    //revoke access.
    res.status(401)
    throw new Error("Sorry!! Not authorized as an admin")
  }
}

export { protect, admin }
