import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import ProductComp from "../components/ProductComp"
import axios from "axios"

const HomePage = () => {
  //save the products in a state.
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products")
      //update the state with products.
      setProducts(data)
    }
    //call the function.
    fetchProducts()
  }, [])
  const renderedItems = products.map(product => {
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
      <h1>Lattest Products.</h1>
      <Row>{renderedItems}</Row>
    </>
  )
}

export default HomePage
