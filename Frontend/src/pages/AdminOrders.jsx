import React, { useEffect, useState } from "react";
import api from "../api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    api.get("/orders").then(res => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Hapus semua pesanan
  const clearAllOrders = async () => {
    if (!window.confirm("Hapus semua pesanan?")) return;

    try {
      await api.delete("/orders/all");
      loadOrders();
      alert("Semua pesanan berhasil dihapus!");
    } catch (err) {
      alert("Gagal menghapus pesanan!");
    }
  };

  // Reset ID pesanan
  const resetOrderID = async () => {
    if (!window.confirm("Reset ID pesanan? (Data akan hilang semua)")) return;

    try {
      await api.delete("/orders/reset");
      loadOrders();
      alert("ID pesanan berhasil direset! dimulai dari 1 lagi.");
    } catch (err) {
      alert("Gagal mereset ID!");
    }
  };

  const th = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #eee",
    fontWeight: "bold",
    background: "#FFD44D"
  };

  const td = {
    padding: "10px",
    borderBottom: "1px solid #f0f0f0"
  };

  return (
    <>
      <AdminNavbar />

      <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Daftar Pesanan Masuk
        </h2>

        {/* Tombol aksi */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: 20 }}>
          <button
            onClick={clearAllOrders}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Hapus Semua Pesanan
          </button>

          <button
            onClick={resetOrderID}
            style={{
              background: "black",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Reset Nomor Pesanan
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)"
          }}
        >
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Produk</th>
              <th style={th}>Qty</th>
              <th style={th}>Total</th>
              <th style={th}>Catatan</th>
              <th style={th}>Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  Tidak ada pesanan
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o.id}>
                  <td style={td}>{o.id}</td>
                  <td style={td}>{o.product_name}</td>
                  <td style={td}>{o.qty}</td>
                  <td style={td}>Rp {o.total.toLocaleString("id-ID")}</td>
                  <td style={td}>{o.note}</td>
                  <td style={td}>{o.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
