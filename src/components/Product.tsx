import React from 'react'

export default function Product({product}:any) {
  return (
    <div className='w-60 h-64 text-center rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl '>
        <img src={product.Image} alt="" className='w-24 h-24 object-contain mx-auto'/>
        <h4 className="text-lg font-semibold mb-1">{product.ProductName}</h4>
        <p className="text-gray-700 mb-3">{product.Price.toLocaleString()} $</p>
        <button
        disabled={!product.Stock}
        className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
          product.Stock
            ? "bg-black hover:bg-gray-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {product.Stock ? "Add" : "No Stock"}
      </button>
    </div>
  )
}

