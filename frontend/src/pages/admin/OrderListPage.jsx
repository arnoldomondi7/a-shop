import React from "react"
import { Table, Button } from "react-bootstrap"
import LoaderComp from "../../components/LoaderComp"
import MessagesComp from "../../components/MessagesComp"
import { useGetOrdersQuery } from "../../redux/api/ordersApiSlice"
import { FaTimes } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <LoaderComp />
      ) : error ? (
        <MessagesComp variant='danger'>
          {error?.data?.message || error.error}
        </MessagesComp>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
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
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListPage
