import React from 'react'
import { FiX } from 'react-icons/fi'

export default function ProductModal({ product, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={product.image} alt={product.name} className="modal-img" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>Rp {product.price.toLocaleString('id-ID')}</strong>
      </div>
    </div>
  )
}