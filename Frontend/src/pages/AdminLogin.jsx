import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("LOGIN DATA:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // ====== VALIDASI WAJIB ======
      if (!data.accessToken) {
        throw new Error("Backend tidak mengirim accessToken");
      }

      if (!data.refreshToken) {
        throw new Error("Backend tidak mengirim refreshToken");
      }

      // ====== SIMPAN TOKEN ======
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      console.log("TOKEN DISIMPAN:");
      console.log("accessToken =", localStorage.getItem("accessToken"));
      console.log("refreshToken =", localStorage.getItem("refreshToken"));

      toast.success("Login berhasil!");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      setErr(error.message);
      toast.error("Login gagal: " + error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Admin Login</h2>

          <form onSubmit={submit} style={{ width: "100%" }}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {err && <div style={styles.error}>{err}</div>}

            <button type="submit" style={styles.btnLogin}>
              Login
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  container: {
    minHeight: "75vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
  },
  card: {
    width: "360px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  label: {
    textAlign: "left",
    display: "block",
    margin: "10px 0 5px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    marginBottom: "10px",
    fontSize: "15px",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginTop: 5,
  },
  btnLogin: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#ff9f1c",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};
