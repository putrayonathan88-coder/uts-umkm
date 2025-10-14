import React, { useEffect, useState } from 'react'
import api from '../api'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data))
  }, [])

  return (
    <div className="product-section">
      <h2 className="title">Daftar Menu Kami</h2>

      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onOpen={setSelected} />
        ))}
      </div>
    </div>
  )
}
