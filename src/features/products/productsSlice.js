import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteProduct, fetchApi, postProduct, updateProduct } from "../fetchApi/fetchApi";

const initialState = {
 products:[],
 updateId : "",
 isLoading:false,
 postSuccess: false,
 updateSuccess: false,
 deleteSuccess: false,
 isError: false,
 error:'',

}
export const getProduct = createAsyncThunk('products/getProduct',async ()=>{
const products =  fetchApi()
return products;

})
export const addProduct = createAsyncThunk('products/addProduct',async (data)=>{
const products = postProduct(data)
return products;

})
export const removeProduct = createAsyncThunk('products/removeProduct',async (id, thunkAPI)=>{
const products = await deleteProduct(id)
thunkAPI.dispatch(productRemove(id))
return products;

})
export const productUpdate = createAsyncThunk('products/productUpdate',async (id, product)=>{
const products = await updateProduct(id, product)
return products;

})
const productsSlice = createSlice({
 name:'products',
 initialState,
 reducers:{
  togglePostSuccess: (state)=>{
state.postSuccess = false;
  },
  toggleDeleteSuccess: (state)=>{
state.deleteSuccess = false;
  },
  productRemove: (state, action)=>{
state.products = state.products.filter(product=> product._id !== action.payload)
  },
  toggleUpdate: (state, action)=>{
    state.updateSuccess = false;
    state.updateId = action.payload

  }
 },
 extraReducers: (builder)=>{
  builder
  .addCase(getProduct.pending, (state, action)=>{
state.isLoading = true;
state.isError = false;

  })
  .addCase(getProduct.fulfilled, (state, action)=>{
   state.products = action.payload;
   state.isLoading = false;
  })
  .addCase(getProduct.rejected, (state, action)=>{
   state.products =[];
   state.isError =true;
   state.error = action.error.message;
  })
  .addCase(addProduct.pending, (state, action)=>{
state.isLoading = true;
state.postSuccess = false;
state.isError = false;

  })
  .addCase(addProduct.fulfilled, (state, action)=>{
   state.postSuccess = true;
   state.isLoading = false;
  })
  .addCase(addProduct.rejected, (state, action)=>{
   state.products =[];
   state.postSuccess = false;
   state.isError =true;
   state.error = action.error.message;
  })
  .addCase(removeProduct.pending, (state, action)=>{
state.isLoading = true;
state.deleteSuccess = false;
state.isError = false;

  })
  .addCase(removeProduct.fulfilled, (state, action)=>{
    state.deleteSuccess = true;
   state.isLoading = false;
  })
  .addCase(removeProduct.rejected, (state, action)=>{
   
   state.deleteSuccess = false;
   state.isError =true;
   state.error = action.error.message;
  })
  .addCase(productUpdate.pending, (state, action)=>{
state.isLoading = true;
state.updateSuccess = false;
state.isError = false;

  })
  .addCase(productUpdate.fulfilled, (state, action)=>{
    state.updateSuccess = true;
   state.isLoading = false;
  })
  .addCase(productUpdate.rejected, (state, action)=>{
   
   state.updateSuccess = false;
   state.isError =true;
   state.error = action.error.message;
  })

 }
});
export const {togglePostSuccess, toggleDeleteSuccess, productRemove, toggleUpdate}= productsSlice.actions;
export default productsSlice.reducer;