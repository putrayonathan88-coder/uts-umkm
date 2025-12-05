const db = require("../config/db");

// =========================
// GET Semua Produk
// =========================
function getAll(req, res) {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
    res.json(rows);
  });
}

// =========================
// GET Produk berdasarkan ID
// =========================
function getById(req, res) {
  const id = req.params.id;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });
    }

    res.json(rows[0]);
  });
}

// =========================
// CREATE Produk Baru (Admin)
// =========================
function create(req, res) {
  const { name, price, description } = req.body;

  // Validasi sederhana
  if (!name) {
    return res.status(400).json({ error: true, message: "Nama produk wajib diisi" });
  }

  // Menentukan URL gambar
  let imageUrl = null;
  if (req.file) {
    imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  } else if (req.body.image) {
    imageUrl = req.body.image;
  }

  const sql =
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, price || 0, description || "", imageUrl], (err, result) => {
    if (err) {
      return res.status(500).json({ error: true, message: err.message });
    }

    // Ambil data terbaru
    db.query("SELECT * FROM products WHERE id = ?", [result.insertId], (err2, rows) => {
      if (err2) {
        return res.status(500).json({ error: true, message: err2.message });
      }
      res.status(201).json(rows[0]);
    });
  });
}

// =========================
// UPDATE Produk berdasarkan ID (Admin)
// =========================
function update(req, res) {
  const id = req.params.id;
  const { name, price, description } = req.body;

  // Cek apakah produk ada
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: true, message: err.message });
    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });
    }

    const old = rows[0];

    // Tentukan apakah ada gambar baru
    let imageUrl = old.image;
    if (req.file) {
      imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const sql =
      "UPDATE products SET name=?, price=?, description=?, image=? WHERE id=?";

    db.query(
      sql,
      [
        name ?? old.name,
        price ?? old.price,
        description ?? old.description,
        imageUrl,
        id,
      ],
      (err2) => {
        if (err2) {
          return res.status(500).json({ error: true, message: err2.message });
        }

        // Kirim data setelah update
        db.query("SELECT * FROM products WHERE id = ?", [id], (err3, latest) => {
          if (err3) {
            return res.status(500).json({ error: true, message: err3.message });
          }
          res.json(latest[0]);
        });
      }
    );
  });
}

// =========================
// DELETE Produk berdasarkan ID
// =========================
function remove(req, res) {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: true, message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });
    }

    res.json({ success: true, message: "Produk berhasil dihapus" });
  });
}

module.exports = { getAll, getById, create, update, remove };
