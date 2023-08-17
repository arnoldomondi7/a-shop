import React from "react"
// used to get the id of the Product.
import { Link, useParams } from "react-router-dom"
import prods from "../prods"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import RatingComp from "../components/RatingComp"
const ProductPage = () => {
  //destructure the id.
  //we rename to productID
  const { id: productId } = useParams()

  const product = prods.find(prod => {
    //find and return all products whose id are on the url and
    //store it in the product variable.
    return prod._id === productId
  })

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

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
  )
}

export default ProductPage
