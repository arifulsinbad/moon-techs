import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addStock, addToBrand } from "../features/cart/filter/filterSlice";
import { getProduct } from "../features/products/productsSlice";

const Home = () => {
  // const [products, setProduct] = useState([])
  const {products, isLoading, isError, error} = useSelector((state)=> state.products)
  const state = useSelector((state)=> state.filter)
  const {stock, brands}=state;
  const dispatch=useDispatch()
  useEffect(()=>{
    // fetch('http://localhost:5000/products')
    // .then(res=> res.json())
    // .then(data=>setProduct(data.data))
    dispatch(getProduct())
  },[dispatch])
  const activeClass = "text-white  bg-indigo-500 border-white";
  let content;
  if(products.length){
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }
  if(products.length && (stock || brands.length)){
    content = products.filter((product)=>{
     if(stock){
      return product.status === true;
     }
     return product;
    }
    ).filter((product)=>{
     if(brands.length){
       return brands.includes(product.brand)
     }
     return product;
    }).map((product)=><ProductCard key={product.model} product={product}></ProductCard>)
 }

  return (
    <div>
       <div className='mb-10 flex justify-end gap-5 w-11/12'>
        <button onClick={()=>dispatch(addStock())}
          className={`border px-3 py-2 rounded-full font-semibold ${ stock ? activeClass : null} `}
        >
          In Stock
        </button>
        <button onClick={()=>dispatch(addToBrand('amd')) } className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}>
          AMD
        </button>
        <button onClick={()=>dispatch(addToBrand('intel'))} className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}`}>
          Intel
        </button>
      </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
     {
      content
     }
    </div>
    </div>
  );
};

export default Home;
