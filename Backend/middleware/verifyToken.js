const jwt = require("jsonwebtoken");

const ACCESS_SECRET = "ACCESS_TOKEN_SECRET_123";

module.exports = function (req, res, next) {
  console.log("\n================ VERIFY TOKEN ================");

  const authHeader = req.headers["authorization"];
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    console.log("⚠️ HEADER KOSONG");
    return res.status(401).json({ valid: false, message: "Header tidak ada" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log("⚠️ FORMAT TOKEN SALAH:", parts);
    return res.status(401).json({ valid: false, message: "Format salah" });
  }

  const token = parts[1];
  console.log("TOKEN:", token);

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ JWT ERROR:", err.name, "-", err.message);

      return res.status(403).json({
        valid: false,
        expired: err.name === "TokenExpiredError",
        message: err.message,
      });
    }

    console.log("✅ TOKEN VALID:", decoded);
    req.admin = decoded;
    next();
  });
};
