import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import cartSliceReducer from "./slices/cartSlice"
import authSlice from "./slices/authSlice"

//create the store.
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

//export the store.
export default store
