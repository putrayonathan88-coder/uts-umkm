const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";
  db.query(sql, [username], async (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const admin = rows[0];

    
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      "RAHASIA_ADMIN_123", 
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
    });
  });
});


router.get("/check-token", verifyToken, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;