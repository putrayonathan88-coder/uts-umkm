import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Cek apakah admin sudah login
  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (!t) navigate("/admin/login");
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMsg("Unauthorized. Silakan login ulang.");
        navigate("/admin/login");
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      if (file) fd.append("image", file);

      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (res.status === 401) {
        setMsg("Session expired. Login ulang.");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMsg("Produk berhasil ditambahkan!");
      setForm({ name: "", price: "", description: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
      setMsg(error.message || "Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR ADMIN */}
      <AdminNavbar />

      {/* BODY ADMIN */}
      <div className="admin-container" style={{ maxWidth: 700, margin: "50px auto", padding: 20 }}>
        <h2 style={{ marginBottom: 20 }}>Tambah Produk (Admin)</h2>

        <form onSubmit={submit} style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          
          <div>
            <label>Nama Produk</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </div>

          <div>
            <label>Harga Produk</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={onChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </div>

          <div>
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </div>

          <div>
            <label>Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: 10 }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              borderRadius: 6,
            }}
          >
            {loading ? "Mengupload..." : "Tambah Produk"}
          </button>

          {msg && (
            <p style={{ marginTop: 15, color: msg.includes("berhasil") ? "green" : "red" }}>
              {msg}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
