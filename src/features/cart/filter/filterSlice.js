import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 stock:false,
 brands:[],
 keyword:''
}
const filterSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToBrand:(state, action)=>{
      if(!state.brands.includes(action.payload)){
        state.brands.push(action.payload)
      }else{
        state.brands = state.brands.filter(brand=> brand !== action.payload)
      }
    },
    addStock: (state, action)=>{
state.stock = !state.stock
    }
  }
});
export const {addStock, addToBrand} = filterSlice.actions;
export default filterSlice.reducer