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
  : { cartItems: [] }

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
        state.existItem = state.existItem.map(product => {
          return product._id === existItem._id ? item : product
        })
      } else {
        //we add the new item
        //to the already existing array of items
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
  },
})

//export the cartSlice reducer.
export default cartSlice.reducer
//export the functions as actions.
export const { addToCart } = cartSlice.actions
