import React from 'react'
import Product from './Product'

export default function ProductList({products}:any) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
        {products.map((product:any,index:number)=>(
            <Product key={index} product={product} />
        ))}

    </div>
  )
}
