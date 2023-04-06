import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 cart:[]
}
const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCard:(state, action)=>{
      const selectProduct = state.cart.find(cart=>cart._id === action.payload._id)
      if(!selectProduct){
        const product = {...action.payload, quantity: 1}
        state.cart.push(product)
      }else{
        selectProduct.quantity += 1;
        state.cart.filter(cart=>cart._id !== action.payload._id).push(selectProduct)
      }
    },
    removeToCart : (state, action )=>{
         if(action.payload.quantity > 1){
          const product = {...action.payload,
          quantity: action.payload.quantity - 1
          }
          state.cart = state.cart.filter(cart=> cart._id !== action.payload._id)
          state.cart.push(product)
         }else{
          state.cart = state.cart.filter(cart=> cart._id !== action.payload._id)

         }
    }
  }
});
export const {addToCard, removeToCart} = cartSlice.actions;
export default cartSlice.reducer