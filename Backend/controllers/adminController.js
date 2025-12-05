const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function login(req, res) {
  const { username, password } = req.body;

  db.query("SELECT * FROM admin WHERE username = ?", [username], async (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (rows.length === 0) return res.status(401).json({ message: "User tidak ditemukan" });

    const admin = rows[0];

    // CEK PASSWORD
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Password salah" });

    // BUAT TOKEN
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      "SECRET_KEY_KAMU",
      { expiresIn: "1d" }
    );

    res.json({ success: true, token });
  });
}
