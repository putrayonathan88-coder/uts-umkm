import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // LOAD PRODUK SAAT HALAMAN DIBUKA //
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // FIX

    // Jika tidak ada token → paksa ke login
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // FIX
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // FUNGSI DELETE PRODUK //
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("accessToken"); // FIX

    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // FIX
        },
      });

      if (res.ok) {
        // Hapus dari state
        setProducts(products.filter((p) => p.id !== id));

        // NOTIFIKASI BERHASIL
        toast.success("Produk berhasil dihapus!");
      } else {
        toast.error("Gagal menghapus produk!");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus produk");
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="admin-container" style={{ padding: 30 }}>
        <h1 style={{ marginBottom: 20 }}>ADMIN — DAFTAR PRODUK</h1>

        {/* TOMBOL TAMBAH PRODUK */}
        <button
          style={{
            padding: "10px 15px",
            background: "green",
            color: "white",
            borderRadius: 6,
            marginBottom: 20,
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/add")}
        >
          + Tambah Produk
        </button>

        {/* LIST PRODUK */}
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              borderRadius: 8,
              marginBottom: 15,
              background: "white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{p.name}</h2>
            <p>Harga: Rp {p.price}</p>

            {/* EDIT BUTTON */}
            <button
              style={{
                background: "blue",
                color: "white",
                padding: "6px 12px",
                marginRight: 10,
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/admin/products/${p.id}/edit`)}
            >
              Edit
            </button>

            {/* DELETE BUTTON */}
            <button
              style={{
                background: "red",
                color: "white",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
