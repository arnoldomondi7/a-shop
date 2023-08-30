import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { saveShippingAddress } from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainerComp"
import CheackOutStepsComp from "../components/CheackOutStepsComp"

const ShippingPage = () => {
  //get the shipping address from the cart
  const { shippingAddress } = useSelector(state => state.cart)
  //create the state to store therequired fields.
  const [address, setAddress] = useState(shippingAddress?.address || "")
  const [city, setCity] = useState(shippingAddress?.city || "")
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  )
  const [country, setCountry] = useState(shippingAddress?.country || "")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = event => {
    event.preventDefault()
    //update the state and the localstorage
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate("/payment")
  }

  return (
    <FormContainer>
      <CheackOutStepsComp step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={event => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={event => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={event => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={event => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage
