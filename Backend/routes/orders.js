const express = require("express");
const router = express.Router();
const db = require("../config/db");

// CREATE ORDER (Public) //
router.post("/", (req, res) => {
  const { product_id, product_name, qty, note, total } = req.body;

  if (!product_id || !qty || !total) {
    return res.status(400).json({
      success: false,
      message: "Data pesanan tidak lengkap"
    });
  }

  const sql = `
    INSERT INTO orders (product_id, product_name, qty, note, total)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [product_id, product_name, qty, note, total], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      message: "Pesanan masuk",
      id: result.insertId
    });
  });
});

// GET ALL ORDERS //
router.get("/", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json(rows);
  });
});

// DELETE ALL ORDERS (Hanya hapus data, ID tetap lanjut) //
router.delete("/all", (req, res) => {
  db.query("DELETE FROM orders", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      message: "Semua pesanan berhasil dihapus"
    });
  });
});

// RESET AUTO INCREMENT (ID balik ke 1) //
router.delete("/reset", (req, res) => {
  db.query("TRUNCATE TABLE orders", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      message: "Semua pesanan dihapus & ID direset ke 1"
    });
  });
});

module.exports = router;
