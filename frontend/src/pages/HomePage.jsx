import React from "react"
import { Row, Col } from "react-bootstrap"
import { useGetProductsQuery } from "../redux/slices/productApiSlice"
import ProductComp from "../components/ProductComp"
import LoaderComp from "../components/LoaderComp"
import MessagesComp from "../components/MessagesComp"

const HomePage = () => {
  //the data we rename as products since thats what we are mapping.
  const { data: products, isLoading, error } = useGetProductsQuery()

  const renderedItems = products?.map(product => {
    return (
      //the Row is used to divide the screen into 12 segments/pigments.
      //the Col is used to occupy the subdivided screens.
      //some might take a bigger or a smaller space.
      // basically its responsive.
      <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
        <ProductComp product={product} />
      </Col>
    )
  })
  return (
    <>
      {/* handle the loading and the error cases. */}
      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessagesComp variant='danger'>
          {error?.data?.message || error?.error}
        </MessagesComp>
      ) : (
        <>
          {" "}
          <h1>Lattest Products.</h1>
          <Row>{renderedItems}</Row>
        </>
      )}
    </>
  )
}

export default HomePage
