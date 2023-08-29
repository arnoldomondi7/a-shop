import express from "express"
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const userRouter = express.Router()

//new user can create an acc.
//only the admin can get access to all the accounts.
userRouter.route("/").post(registerUser).get(protect, admin, getUsers)
//registered user can login
userRouter.post("/auth", authUser)
//signed in user can logout.
userRouter.post("/logout", logoutUser)
//only the authenticated user can update his/her profile.
//'' '' '' '' '' get access to his/her profile
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
//admin can delete user,
//admin can update the user.
userRouter
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default userRouter
