import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  // AMBIL DATA PRODUK
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // KIRIM PESANAN KE BACKEND + WHATSAPP
  const sendOrder = async () => {
    const order = {
      product_id: selected.id,
      product_name: selected.name,
      qty,
      note,
      total: selected.price * qty,
    };

    try {
      const res = await api.post("/orders", order);

      if (res.data.success) {
        const orderId = res.data.id;
        const adminNumber = "6285243212470";

        const text = `
Pesanan Baru UMKM:

ID Pesanan : ${orderId}
Produk     : ${selected.name}
Jumlah     : ${qty}
Total      : Rp ${(selected.price * qty).toLocaleString("id-ID")}
Catatan    : ${note || "-"}

Terima kasih 🙏
        `;

        // KIRIM KE WHATSAPP
        window.open(
          `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`,
          "_blank"
        );

        // RESET FORM
        setSelected(null);
        setQty(1);
        setNote("");
      }
    } catch (err) {
      alert("Gagal mengirim pesanan.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="product-section">
        <h2 className="title">Daftar Menu</h2>

        {/* GRID PRODUK */}
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={() => setSelected(p)} />
          ))}
        </div>

        {selected && (
          <div className="modal">
            <div className="modal-box">

              <h2>Pesan {selected.name}</h2>

              <label>Jumlah</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />

              <label>Catatan</label>
              <textarea
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: kurangi gula..."
              />

              <button className="pesan-btn" onClick={sendOrder}>
                Kirim Pesanan
              </button>

              <button className="close-btn" onClick={() => setSelected(null)}>
                Tutup
              </button>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
