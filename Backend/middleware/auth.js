const jwt = require("jsonwebtoken");

const ACCESS_SECRET = "ACCESS_TOKEN_SECRET_123";
const REFRESH_SECRET = "REFRESH_SECRET_123";

let refreshTokens = [];

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1m" });
}


function generateRefreshToken(payload) {
  const token = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  refreshTokens.push(token);
  return token;
}

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];

  if (!header)
    return res.status(401).json({ error: true, message: "Token tidak ada" });

  const [bearer, token] = header.split(" ");

  if (bearer !== "Bearer")
    return res.status(401).json({ error: true, message: "Format token salah" });

  jwt.verify(token, ACCESS_SECRET, (err, payload) => {
    if (err)
      return res.status(401).json({ error: true, message: "Token expired / invalid" });

    req.admin = payload;
    next();
  });
}

module.exports = {
  authMiddleware,
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  ACCESS_SECRET,
  REFRESH_SECRET,
};
