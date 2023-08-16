import React from "react"
import { Row, Col } from "react-bootstrap"
import products from "../prods"
import ProductComp from "../components/ProductComp"

const HomePage = () => {
  const renderedItems = products.map(product => {
    return (
      //the Row is used to devide the screen into 12 segments/pigments.
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
      <h1>Lattest Products.</h1>
      <Row>{renderedItems}</Row>
    </>
  )
}

export default HomePage
