import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const AdminRouteComp = () => {
  const { userInfo } = useSelector(state => state.auth)
  //check if is logged in user and also admin.
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  )
}

export default AdminRouteComp
