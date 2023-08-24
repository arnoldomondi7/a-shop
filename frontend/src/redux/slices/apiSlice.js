import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constants"

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
//CREATE THE PARENT APISLICE.
export const apiSlice = createApi({
  baseQuery,
  //tagTypes-> types of data that will be fetched from the api.
  tagTypes: ["Product", "User", "Order"],
  //endpoints-> conduct the actual api fetching.
  endpoints: builder => ({}),
})
