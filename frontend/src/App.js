import React from "react"
import { Outlet } from "react-router-dom"
import HeaderComp from "./components/HeaderComp"
import { Container } from "react-bootstrap"
import FooterComp from "./components/FooterComp"

const App = () => {
  return (
    <>
      {/* the header component */}
      <HeaderComp />
      {/* the main component */}
      <main className='py-3'>
        {/* prevents items from touching the sides of the browser */}
        <Container>
          <Outlet />
        </Container>
      </main>
      <FooterComp />
    </>
  )
}

export default App
