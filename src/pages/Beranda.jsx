import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Beranda() {
  const navigate = useNavigate()

  const goToProducts = () => {
    navigate('/produk')
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className='home-text'>Mitra S</h1>
        <h1 className="home-title">Kami Ada Karena Rasa</h1>
        <p className="home-subtitle">
          Segarkan harimu, hatimu dengan jus buah pilihan terbaik!
        </p>
        <button className="home-button" onClick={goToProducts}>
          Lihat Menu Kami
        </button>
      </div>
    </div>
  )
}


