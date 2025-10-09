import React, { useEffect, useState } from 'react'
import api from '../api'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data))
  }, [])

  return (
    <div className="product-section">
      {/* Judul di tengah */}
      <h2 className="title">Daftar Menu Kami</h2>

      {/* Grid daftar produk */}
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onOpen={setSelected} />
        ))}
      </div>

      {/* Modal produk */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
