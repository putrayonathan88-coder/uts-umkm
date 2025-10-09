import React from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { GrEmergency } from 'react-icons/gr'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Mekar Tanjung</h1>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/produk">Produk</Link></li>
          <li><Link to="/tentang">Tentang Kami</Link></li>
        </ul>
        <div className="search-box">
          <input type="text" placeholder="Cari minuman..." />
        </div>

      </div>
    </nav>
  )
}
