import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit" 
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/cart/filter/filterSlice";
import logger from "redux-logger";
import productsSlice from "../features/products/productsSlice";
const store = configureStore({
 reducer:{
  devTool: false,
  cart: cartSlice,
  filter:filterSlice,
  products: productsSlice,
 },
 middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
})
export default store;