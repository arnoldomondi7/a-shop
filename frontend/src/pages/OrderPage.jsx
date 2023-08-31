import React, { useEffect } from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import LoaderComp from "../components/LoaderComp"
import { Link, useParams } from "react-router-dom"
import MessagesComp from "../components/MessagesComp"
import { toast } from "react-toastify"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../redux/api/ordersApiSlice"
import { useSelector } from "react-redux"

const OrderPage = () => {
  //uded to get id from the url
  const { id: orderId } = useParams()

  //refetch is used to get new orders.
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId)

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()

  const { userInfo } = useSelector(state => state.auth)

  //handle paypal payment processing.
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  //just re-naming the constants.
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery()

  //load the paypal script.
  useEffect(() => {
    //its not loading or error but there is cientID
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      //create a function to load the paypal script
      const loadPaypalScript = async () => {
        //dispatch some instrictions(in the docs)
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        })
        paypalDispatch({ type: "setLoadingStatus", value: "pending" })
      }
      if (order && !order.isPaid) {
        //check if payment is yet to be made.
        if (!window.paypal) {
          //load the script.
          loadPaypalScript()
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

  function onApprove(data, actions) {
    //found in the docs.
    //returns a promise.
    //this is what triggers paypal.
    return actions.order.capture().then(async function (details) {
      try {
        //comming from the mutation ( slice)
        await payOrder({ orderId, details })
        //so that is says paid once its done.
        refetch()
        toast.success("Order is paid")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success('Order is paid');
  // }

  function onError(err) {
    //show error
    toast.error(err?.message)
  }

  function createOrder(data, actions) {
    //from the docs.
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order?.totalPrice },
          },
        ],
      })
      .then(orderID => {
        //return the order id.
        return orderID
      })
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId)
    refetch()
  }

  return isLoading ? (
    <LoaderComp />
  ) : error ? (
    <MessagesComp variant='danger'>{error.data.message}</MessagesComp>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessagesComp variant='success'>
                  Delivered on {order.deliveredAt}
                </MessagesComp>
              ) : (
                <MessagesComp variant='danger'>Not Delivered</MessagesComp>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <MessagesComp variant='success'>
                  Paid on {order.paidAt}
                </MessagesComp>
              ) : (
                <MessagesComp variant='danger'>Not Paid</MessagesComp>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <MessagesComp>Order is empty</MessagesComp>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* only show if its not payed */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <LoaderComp />}

                  {isPending ? (
                    <LoaderComp />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                          style={{ marginBottom: '10px' }}
                          onClick={onApproveTest}
                        >
                          Test Pay Order
                        </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <LoaderComp />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage
