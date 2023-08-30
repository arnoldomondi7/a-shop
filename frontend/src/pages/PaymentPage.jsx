import React, { useEffect, useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import CheackOutStepsComp from "../components/CheackOutStepsComp"
import FormContainer from "../components/FormContainerComp"
import { savePaymentMethod } from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const PaymentPage = () => {
  const navigate = useNavigate()
  const { shippingAddress } = useSelector(state => state.cart)

  useEffect(() => {
    //if the user's address you will be directed back.
    if (!shippingAddress.address) {
      navigate("/shipping")
      toast.info("Please fill in your shipping info")
    }
  }, [navigate, shippingAddress])

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  //save the payment method.
  const handleSubmit = event => {
    event.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <FormContainer>
      <CheackOutStepsComp step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={event => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
