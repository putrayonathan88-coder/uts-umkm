const jwt = require("jsonwebtoken");

// NOTE: secret disimpan di kode karena kamu minta tanpa .env
const JWT_SECRET = "rahasia_jwt_123456"; // ganti kalau mau

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: true, message: "No token" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: true, message: "Invalid token format" });

  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: true, message: "Invalid token" });
    req.admin = payload; // payload contains admin info
    next();
  });
}

module.exports = { authMiddleware, JWT_SECRET };
