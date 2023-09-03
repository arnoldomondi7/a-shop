import React, { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import RatingComp from "../components/RatingComp"
import LoaderComp from "../components/LoaderComp"
import MessagesComp from "../components/MessagesComp"

import { addToCart } from "../redux/slices/cartSlice"
import { useGetProductDetailsQuery } from "../redux/api/productsApiSlice"

const ProductPage = () => {
  //create the state to handle the quantity.
  const [qty, setQty] = useState(1)
  //get the id that will be passed.
  const { id: productId } = useParams()
  //initialise the dispatch
  const dispatch = useDispatch()
  //initiliase the navigate.
  const navigate = useNavigate()
  //get the needed data.
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId)

  //function to add items to cart.
  const handleAddItemsToCart = event => {
    //dispatch the add the cart instruction.
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    )
    navigate("/cart")
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessagesComp variant='danger'>
          {error?.data?.message || error?.error}
        </MessagesComp>
      ) : (
        <>
          {" "}
          <Row>
            <Col md={5}>
              {/* fluid =  responsive */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flash'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <RatingComp
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> About the Product:</strong>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? `${product.countInStock} Available`
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={event =>
                                setQty(Number(event.target.value))
                              }
                            >
                              {/* ensure the user can only add from the stock */}
                              {/* array keyword created an array with length equal to that in stock. */}
                              {/* keys method is used to create indexes that staert from 0 */}
                              {[...Array(product.countInStock).keys()].map(
                                item => {
                                  return (
                                    <option key={item + 1} value={item + 1}>
                                      {item + 1}
                                    </option>
                                  )
                                }
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      disabled={product.countInStock === 0}
                      onClick={handleAddItemsToCart}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductPage
