const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

const ACCESS_SECRET = "ACCESS_TOKEN_SECRET_123";
const REFRESH_SECRET = "REFRESH_TOKEN_SECRET_123";

// Tempat menyimpan refresh token (sementara, bisa pindah ke DB)
let refreshTokens = [];

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1m" });
}

// Refresh Token 7 hari
function generateRefreshToken(payload) {
  const token = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  refreshTokens.push(token);
  return token;
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";
  db.query(sql, [username], async (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const admin = rows[0];

    // cek password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const payload = { id: admin.id, username: admin.username };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // simpan session di server
    req.session.admin = payload;

    return res.json({
      success: true,
      message: "Login berhasil",
      accessToken,
      refreshToken,
      session: req.session.admin
    });
  });
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ message: "Refresh token diperlukan" });

  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Refresh token tidak valid" });

  jwt.verify(refreshToken, REFRESH_SECRET, (err, payload) => {
    if (err)
      return res.status(403).json({ message: "Refresh token expired" });

    const newAccessToken = generateAccessToken({
      id: payload.id,
      username: payload.username,
    });

    return res.json({ accessToken: newAccessToken });
  });
});


router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  }

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Gagal logout" });

    res.clearCookie("umkm_session_id");
    return res.json({ success: true, message: "Logout berhasil" });
  });
});

router.get("/check-token", verifyToken, (req, res) => {
  res.json({
    valid: true,
    sessionUser: req.session.admin,
    tokenUser: req.admin,
  });
});

module.exports = router;
