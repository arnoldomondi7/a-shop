import React, { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useGetMyOrdersQuery } from "../redux/api/ordersApiSlice"
import { useProfileMutation } from "../redux/api/usersApiSlice"
import { setCredentials } from "../redux/slices/authSlice"
import { toast } from "react-toastify"
import LoaderComp from "../components/LoaderComp"
import { FaTimes } from "react-icons/fa"
import MessagesComp from "../components/MessagesComp"

const ProfilePage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { userInfo } = useSelector(state => state.auth)

  const { data: orders, isLoading, error } = useGetMyOrdersQuery()

  //from redux store.
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()

  useEffect(() => {
    //fill the name and the email.
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.email, userInfo.name])

  const dispatch = useDispatch()

  //function to handle the submit.
  const handleSubmit = async event => {
    event.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await updateProfile({
          //what will be updated.
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success("Profile updated successfully")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
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

          <Button type='submit' variant='primary'>
            Update
          </Button>
          {loadingUpdateProfile && <LoaderComp />}
        </Form>
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {isLoading ? (
          <LoaderComp />
        ) : error ? (
          <MessagesComp variant='danger'>
            {error?.data?.message || error.error}
          </MessagesComp>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <FaTimes style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfilePage
