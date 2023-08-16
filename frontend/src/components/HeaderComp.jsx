import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import logo from "../assets/logo.png"

const HeaderComp = () => {
  return (
    <header>
      {/* purpose of container is so the inner parts of the navbar 
    dont streach all the way to the end of the browser */}
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* This represents the brand or the logo */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='imagelogo' />
              a-shop
            </Navbar.Brand>
          </LinkContainer>

          {/* used to show and hide items in the navbar. */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {/* used to group and hide navbar contents */}
          <Navbar.Collapse>
            {/* align items to the right */}
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link href='/cart'>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link href='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default HeaderComp
