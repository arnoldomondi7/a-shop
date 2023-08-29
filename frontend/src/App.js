import React from "react"
import { Outlet } from "react-router-dom"
import HeaderComp from "./components/HeaderComp"
import { Container } from "react-bootstrap"
import FooterComp from "./components/FooterComp"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      {/* the header component */}
      <HeaderComp />
      {/* the main component */}
      <main className='py-3'>
        {/* prevents items from touching the sides of the browser */}
        <Container>
          {/* Outlet is used in the parent route element to 
        Render the child route elements  */}
          <Outlet />
        </Container>
      </main>
      <FooterComp />
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  )
}

export default App
