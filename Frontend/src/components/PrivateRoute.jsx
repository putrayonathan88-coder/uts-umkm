import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";

export default function PrivateRoute({ children }) {
  const [valid, setValid] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  function logoutNow() {
    console.log(">> AUTO LOGOUT: TOKEN EXPIRED");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setValid(false);
    setChecking(false);
    navigate("/admin/login", { replace: true });
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return logoutNow();

      axios
        .get(`${BASE_URL}/admin/check-token`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data?.valid) setValid(true);
          else logoutNow();
          setChecking(false);
        })
        .catch(() => logoutNow());
    };

    checkToken();

    // 🔥 CEK SETIAP 1 DETIK UNTUK LOGOUT CEPAT
    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, []);

  if (checking) return <p style={{ padding: 20 }}>Memeriksa akses...</p>;

  if (!valid) return <Navigate to="/admin/login" replace />;

  return children;
}
