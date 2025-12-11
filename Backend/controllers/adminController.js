const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SECRET TOKEN (HARUS SAMA DENGAN verifyToken & authMiddleware)
const ACCESS_SECRET = "ACCESS_TOKEN_SECRET_123";
const REFRESH_SECRET = "REFRESH_SECRET_123";

// TEMPAT MENYIMPAN REFRESH TOKEN (sementara)
let refreshTokens = [];

//  LOGIN ADMIN //
function login(req, res) {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username = ?",
    [username],
    async (err, rows) => {
      if (err)
        return res.status(500).json({ message: "Database error: " + err });
      if (rows.length === 0)
        return res.status(401).json({ message: "User tidak ditemukan" });

      const admin = rows[0];

      // Cocokkan password
      const match = await bcrypt.compare(password, admin.password);
      if (!match)
        return res.status(401).json({ message: "Password salah" });

      // Buat ACCESS TOKEN (exp 1 jam)
      const accessToken = jwt.sign(
        { id: admin.id, username: admin.username },
        ACCESS_SECRET,
        { expiresIn: "1m" }
      );

      // Buat REFRESH TOKEN
      const refreshToken = jwt.sign(
        { id: admin.id, username: admin.username },
        REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      refreshTokens.push(refreshToken);

      return res.json({
        success: true,
        accessToken,
        refreshToken,
      });
    }
  );
}

// REFRESH TOKEN //
function refresh(req, res) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Token tidak ada" });
  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Refresh token tidak valid" });

  jwt.verify(token, REFRESH_SECRET, (err, admin) => {
    if (err)
      return res.status(403).json({ message: "Refresh token tidak valid / expired" });

    const newAccessToken = jwt.sign(
      { id: admin.id, username: admin.username },
      ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });
  });
}

// ===================== LOGOUT ===================== //
function logout(req, res) {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ success: true, message: "Logout berhasil" });
}

module.exports = {
  login,
  refresh,
  logout,
  ACCESS_SECRET,
  REFRESH_SECRET,
  refreshTokens,
};
