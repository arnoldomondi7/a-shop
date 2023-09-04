import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice"
import { toast } from "react-toastify"
import FormContainer from "../../components/FormContainerComp"
import LoaderComp from "../../components/LoaderComp"
import MessagesComp from "../../components/MessagesComp"
import { Button, Form } from "react-bootstrap"

const UserEditPage = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await updateUser({ userId, name, email, isAdmin })
      toast.success("user updated successfully")
      refetch()
      navigate("/admin/userlist")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <LoaderComp />}
        {isLoading ? (
          <LoaderComp />
        ) : error ? (
          <MessagesComp variant='danger'>
            {error?.data?.message || error.error}
          </MessagesComp>
        ) : (
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

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={event => setIsAdmin(event.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditPage
