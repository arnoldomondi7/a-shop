//ensure you have the right decimals.
export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

//function to update the cart.
export const updateCart = state => {
  //calculate the items price.
  //we use the reduce method.
  //also take account of the quantity
  //the acc starts at 0, loops through, adding the item.price * item*qty then
  //we end up with the total item.price
  //the default at the end is set to 0
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  //calculate the shipping price.
  //free shipping for items over $100.
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
  //calculate the tax price.
  //we assume thats its 15% of the items price.
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
  //calculate the total price.
  //all all the above.
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2)

  //save it to the localStorage.
  //stringify the data.
  const stateStringified = JSON.stringify(state)
  localStorage.setItem("cart", stateStringified)

  return state
}
