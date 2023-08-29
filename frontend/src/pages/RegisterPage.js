import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import LoaderComp from "../components/LoaderComp"
import FormContainer from "../components/FormContainerComp"
import { toast } from "react-toastify"
import { setCredentials } from "../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../redux/api/usersApiSlice"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={event => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>

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
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Register
        </Button>

        {isLoading && <LoaderComp />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage
