import React from 'react'
import { FiInfo } from 'react-icons/fi'

export default function ProductCard({ product, onOpen }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-footer">
          <span>Rp {product.price.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  )
}
