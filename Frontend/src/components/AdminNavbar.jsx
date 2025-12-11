import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    // HAPUS TOKEN YANG BENAR
    localStorage.removeItem("accessToken");

    // Redirect ke login
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">

        {/* KIRI */}
        <div className="admin-left">
          <h2 className="admin-logo">Admin Panel</h2>
        </div>

        {/* MENU TENGAH */}
        <ul className="admin-nav-links">
          <li><Link to="/admin/products">Produk</Link></li>
          <li><Link to="/admin/add">Tambah Produk</Link></li>
          <li><Link to="/admin/orders">Pesanan</Link></li>
        </ul>

        {/* KANAN */}
        <div className="admin-right">
          <button className="admin-logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
