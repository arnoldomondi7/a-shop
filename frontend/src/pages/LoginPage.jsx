import React, { useEffect, useState } from "react"
import FormContainer from "../components/FormContainerComp"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import LoaderComp from "../components/LoaderComp"
import { useLoginMutation } from "../redux/api/usersApiSlice"
import { setCredentials } from "../redux/slices/authSlice"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth)

  //help redirect the user to the checkout page
  //if the user had started making orders.
  //get the search feature from the useLoacation hook.
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  //make this run at first.
  //redirect homepage or the checkout.
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      //unwrap=> get the resolved value from the promise.
      const res = await login({ email, password }).unwrap()
      //update the local storage with these credentials.
      dispatch(setCredentials({ ...res }))
      //navigate to the app. page.
      navigate(redirect)
      toast.info("User successfully Logged in.")
    } catch (err) {
      //log an error incase there is any.
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Sign In
        </Button>

        {isLoading && <LoaderComp />}
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            style={{ textDecoration: "none" }}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage
