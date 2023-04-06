import axios from "../utils/axios.config";

export const fetchApi =async ()=>{
 const data = await axios.get('/products')
 return data.data.data;
}

export const postProduct =async (postProduct)=>{
 await axios.post('/product', postProduct)
}
export const deleteProduct =async (id)=>{
 await axios.delete(`/product/${id}`)
}
export const updateProduct =async (id, product)=>{
 await axios.put(`/product/${id}`, product)
}
