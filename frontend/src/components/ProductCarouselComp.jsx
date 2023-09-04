import React from "react"
import { Carousel, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import MessagesComp from "./MessagesComp"
import { useGetTopProductsQuery } from "../redux/api/productsApiSlice"

const ProductCarouselComp = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? null : error ? (
    <MessagesComp variant='danger'>
      {error?.data?.message || error.error}
    </MessagesComp>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarouselComp
