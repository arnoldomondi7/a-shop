import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

//outlet=> what we return when we are logged in.
//Navigate=> used to redirect the user when user is not logged in.
const PrivateRoute = () => {
  //get the userInfo from the auth in the redux store.\//replace=< replace any past history
  const { userInfo } = useSelector(state => state.auth)
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
