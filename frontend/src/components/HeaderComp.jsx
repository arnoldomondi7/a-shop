import React from "react"
import { Badge, Navbar, Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { VscActivateBreakpoints } from "react-icons/vsc"
import { useSelector } from "react-redux"

const HeaderComp = () => {
  //get data from the state.
  const { cartItems } = useSelector(state => {
    //retruns the part of the state that you want.
    return state.cart
  })

  return (
    <header>
      {/* purpose of container is so the inner parts of the navbar 
    dont streach all the way to the end of the browser */}
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* This represents the brand or the logo */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              <p style={{ padding: "3px" }}>
                <VscActivateBreakpoints size={29} /> a-shop
              </p>
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
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                    </Badge>
                  )}
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
