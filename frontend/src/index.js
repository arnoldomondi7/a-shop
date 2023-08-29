import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import App from "./App"
//pages
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ShippingPage from "./pages/ShippingPage"
//styles
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"

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
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/shipping' element={<ShippingPage />} />
    </Route>
  )
)

const el = document.querySelector("#root")
const root = createRoot(el)
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
