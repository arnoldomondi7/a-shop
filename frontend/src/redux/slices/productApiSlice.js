//import the product url constant.
import { PRODUCT_URL } from "../constants"
//get the apiSlice.
import { apiSlice } from "./apiSlice"

//create the slice to get the products
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //get all the products.
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: productId => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

//export the products.
//convention-> prefx with use and suffex with Query.
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productApiSlice
