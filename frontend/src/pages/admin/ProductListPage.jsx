import React from "react"
import PaginateComp from "../../components/PaginateComp"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { Button, Col, Row, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import MessagesComp from "../../components/MessagesComp"
import LoaderComp from "../../components/LoaderComp"
import { toast } from "react-toastify"
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/productsApiSlice"
import { useParams } from "react-router-dom"

const ProductListPage = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  })

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async id => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id)
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  //function to create a new product.
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct()
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <LoaderComp />}
      {loadingDelete && <LoaderComp />}
      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessagesComp variant='danger'>{error.data.message}</MessagesComp>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateComp pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListPage
