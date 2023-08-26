import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import MessagesComp from "../components/MessagesComp"

const CartPage = () => {
  //initialise the navigate.
  const navigate = useNavigate()
  //initilase the dispatch.
  const dispatch = useDispatch()

  //get the cart from the redux store.
  const { cartItems } = useSelector(state => {
    return state.cart
  })

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}> Shopping Cart</h1>
        {/* logic for what to do if the cart is empty. */}
        {cartItems.length === 0 ? (
          <MessagesComp>
            Your Cart is Empty <Link to='/'>Home</Link>
          </MessagesComp>
        ) : (
          <ListGroup variant='flush'></ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default CartPage
