import jwt from "jsonwebtoken"

//function to generate the token.
//res -> to store the token in the httponly-cookie,
//userId to create a secret.
const generateToken = (res, userId) => {
  //create the token and store it in the token variable.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })

  // Set JWT as an HTTP-Only cookie
  //"jwt"-> is the name we decide to call it.
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}

export default generateToken
