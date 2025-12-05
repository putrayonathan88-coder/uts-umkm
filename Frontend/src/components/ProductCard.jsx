import React from "react";

export default function ProductCard({ product, onOrder }) {

  // Fallback gambar jika null
  const imageSrc = product.image
    ? product.image
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="product-card">

      <img src={imageSrc} alt={product.name} className="product-image" />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        {/* TOMBOL PESAN */}
        <button 
          className="pesan-btn"
          onClick={onOrder}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            background: "orange",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            color: "white",
            cursor: "pointer"
          }}
        >
          Pesan
        </button>
      </div>

    </div>
  );
}
