import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import LoaderComp from "../../components/LoaderComp"
import MessagesComp from "../../components/MessagesComp"
import FormContainer from "../../components/FormContainerComp"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productsApiSlice"

const ProductEditPage = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")

  //get the product details
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)

  //slice to update the product.
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      //slice that will update the product.
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap() // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated")
      refetch()
      navigate("/admin/productlist")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  //update the items when the page runs.
  useEffect(() => {
    //check if the product is there.
    if (product) {
      //if yest set items on the state.
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const handleUploadFile = async event => {
    const formData = new FormData()
    formData.append("image", event.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add/Edit Product</h1>
        {loadingUpdate && <LoaderComp />}
        {isLoading ? (
          <LoaderComp />
        ) : error ? (
          <MessagesComp variant='danger'>{error.data.message}</MessagesComp>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={event => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={event => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={event => setImage(event.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={handleUploadFile}
                type='file'
              ></Form.Control>
              {loadingUpload && <LoaderComp />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={event => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={event => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={event => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditPage
