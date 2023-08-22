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
import ProductPage from "./pages/ProductPage"

//declare the router.
//createBrowserRouter==> enables us to access the react-router-dom
//in the whole application.
const router = createBrowserRouter(
  //helps you weave the jsx elements together.
  createRoutesFromElements(
    // this is a parent and takes in the entire App.
    <Route path='/' element={<App />}>
      {/* here you create other routes */}
      {/* index prevent showing many pages */}
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />
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
