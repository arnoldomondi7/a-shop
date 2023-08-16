import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"
import App from "./App"
import HomePage from "./pages/HomePage"

//create the router.
const router = createBrowserRouter(
  createRoutesFromElements(
    // this is a parent and takes in the entire App.
    <Route path='/' element={<App />}>
      {/* here you create other routes */}
      {/* index prevent showing many pages */}
      <Route index={true} path='/' element={<HomePage />} />
    </Route>
  )
)

const el = document.querySelector("#root")
const root = createRoot(el)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
