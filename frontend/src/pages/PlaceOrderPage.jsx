import React, { useEffect } from "react"
import LoaderComp from "../components/LoaderComp"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import MessagesComp from "../components/MessagesComp"
import CheackOutStepsComp from "../components/CheackOutStepsComp"
import { toast } from "react-toastify"
import { clearCartItems } from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useCreateOrderMutation } from "../redux/api/ordersApiSlice"

const PlaceOrderPage = () => {
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  //if there is no shipping or payment redirect.
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping")
    } else if (!cart.paymentMethod) {
      navigate("/payment")
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const dispatch = useDispatch()

  //functuion to run when the order has been placed.
  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      //after the api, clear the cart items
      dispatch(clearCartItems())
      //go to the order.
      navigate(`/order/${res._id}`)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      <CheackOutStepsComp step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart?.cartItems?.length === 0 ? (
                <MessagesComp>Your cart is empty</MessagesComp>
              ) : (
                <ListGroup variant='flush'>
                  {cart?.cartItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <MessagesComp variant='danger'>
                    {error?.data?.message}
                  </MessagesComp>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                {isLoading && <LoaderComp />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
