import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD DATA PRODUK BERDASARKAN ID
  // ==========================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Session expired, silakan login ulang.");
      navigate("/admin/login");
      return;
    }

    api
      .get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // FIX
        },
      })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Gagal memuat data produk");
        setLoading(false);
      });
  }, [id, navigate]);

  // HANDLE INPUT PERUBAHAN
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ==========================
  // UPDATE PRODUK
  // ==========================
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Session expired. Silakan login ulang.");
        navigate("/admin/login");
        return;
      }

      await api.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`, // FIX PENTING
        },
      });

      toast.success("Produk berhasil diperbarui!");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Gagal memperbarui produk");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 30 }}>Loading...</p>;
  }

  return (
    <>
      <AdminNavbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Edit Produk</h2>

          <form onSubmit={updateProduct} style={{ width: "100%" }}>
            <label style={styles.label}>Nama Produk</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Harga</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Deskripsi</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            <label style={styles.label}>URL Gambar</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.btnSave}>
              Simpan Perubahan
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              style={styles.btnCancel}
            >
              Batal
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

// ==========================
// CSS INLINE
// ==========================

const styles = {
  container: {
    minHeight: "75vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "450px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },

  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    height: "90px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    fontSize: "15px",
    resize: "vertical",
  },

  btnSave: {
    width: "100%",
    padding: "12px",
    background: "#4CAF50",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  btnCancel: {
    width: "100%",
    padding: "12px",
    background: "#d9534f",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
