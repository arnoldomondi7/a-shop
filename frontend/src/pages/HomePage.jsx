import React from "react"
import { Row, Col } from "react-bootstrap"
import ProductComp from "../components/ProductComp"
import LoaderComp from "../components/LoaderComp"
import MessagesComp from "../components/MessagesComp"
import { useGetProductsQuery } from "../redux/api/productsApiSlice"
import ProductCarouselComp from "../components/ProductCarouselComp.jsx"
import { Link, useParams } from "react-router-dom"
import MetaComp from "../components/MetaComp.jsx"
import PaginateComp from "../components/PaginateComp"

const HomePage = () => {
  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })

  return (
    <>
      {!keyword ? (
        <ProductCarouselComp />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessagesComp variant='danger'>
          {error?.data?.message || error.error}
        </MessagesComp>
      ) : (
        <>
          <MetaComp />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductComp product={product} />
              </Col>
            ))}
          </Row>
          <PaginateComp
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomePage
