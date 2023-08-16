import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import RatingComp from "./RatingComp"

const ProductComp = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* create a link */}
      <Link to={`/product/${product._id}`}>
        {/* variant = location of the image(possition of the image) */}
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <RatingComp
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductComp
