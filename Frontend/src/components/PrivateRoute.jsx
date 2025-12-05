import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";

export default function PrivateRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  // TIMER global untuk auto logout
  let inactivityTimer;

  // Fungsi logout otomatis
  const autoLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // Reset timer ketika user bergerak
  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(autoLogout, 2 * 60 * 1000); // 2 menit
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setChecking(false);
      return;
    }

    // Validasi token ke backend
    axios
      .get(`${BASE_URL}/admin/check-token`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setValid(true);
        setChecking(false);

        // Mulai timer
        resetTimer();

        // Tambahkan event yang dianggap aktivitas
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("click", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("scroll", resetTimer);
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        setValid(false);
        setChecking(false);
      });

    // Hapus event listener saat keluar halaman
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  if (checking) return <p style={{ padding: 20 }}>Memeriksa akses...</p>;

  if (!valid) return <Navigate to="/admin/login" replace />;

  return children;
}
