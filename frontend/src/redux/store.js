import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"

//create the store.
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

//export the store.
export default store
