import React from "react"
import { Spinner } from "react-bootstrap"

const LoaderComp = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "70px",
        height: "70px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  )
}

export default LoaderComp
