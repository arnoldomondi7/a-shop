import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../../utils/cartUtils"
//declare the initialState.
//store them in the local storage.
//check if there is data in the local storage.
//if its there parse it to make it readable.
//parse--> converts to objects.
//stringify--> converts to String.
//if empty decalre a var called cartItems with and empty array.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state-> whatever the current state is
    // action-> represents data inside the payload. (instructions from the dispatch)
    // in this case we will send an item to be added to the cart.
    addToCart: (state, action) => {
      const item = action.payload //item to be added to cart.

      //check if the item is in the cart.
      //if its there put it in the existItem variable.
      const existItem = state.cartItems.find(product => {
        return product._id === item._id
      })

      //update the quanitity if its there.
      //if not there just return the item as it is.
      if (existItem) {
        state.cartItems = state.cartItems.map(x => {
          return x._id === existItem._id ? item : x
        })
      } else {
        //we add the new item
        //to the already existing array of items
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      )
      //update the localStorage.
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
    clearCartItems: (state, action) => {
      //empty the cartItems.
      state.cartItems = []
      //update the localstorage with the (empty) data.
      localStorage.setItem("cart", JSON.stringify(state))
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: state => (state = initialState),
  },
})

//export the cartSlice reducer.
export default cartSlice.reducer
//export the functions as actions.
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions
