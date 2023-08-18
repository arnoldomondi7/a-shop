import React, { useEffect, useState } from "react"
// used to get the id of the Product.
import { Link, useParams } from "react-router-dom"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import RatingComp from "../components/RatingComp"
import axios from "axios"
const ProductPage = () => {
  //store the single product in the state.
  const [product, setProduct] = useState({})

  //destructure the id.
  //we rename to productID
  const { id: productId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`)
      setProduct(data)
    }

    //call the function
    fetchProduct()
  }, [productId])
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
