const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header tidak ada" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Format token salah" });
  }

  const token = parts[1];

  jwt.verify(token, "RAHASIA_ADMIN_123", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }

    req.admin = decoded;
    next();
  });
};
