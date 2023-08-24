import React from "react"
// used to get the id of the Product.
import { Link, useParams } from "react-router-dom"
import { useGetProductDetailsQuery } from "../redux/slices/productApiSlice"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import RatingComp from "../components/RatingComp"
import LoaderComp from "../components/LoaderComp"
import MessagesComp from "../components/MessagesComp"

const ProductPage = () => {
  //get the id that will be passed.
  const { id: productId } = useParams()
  //get the needed data.
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId)

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
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      disabled={product.countInStock === 0}
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
