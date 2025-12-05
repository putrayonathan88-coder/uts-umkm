const express = require("express");
const router = express.Router();
const products = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

// GANTI authMiddleware → JWT verifyToken
const verifyToken = require("../middleware/verifyToken");

// multer config
const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  }
});
const upload = multer({ storage });

// PUBLIC ROUTES (boleh tanpa login)
router.get("/", products.getAll);
router.get("/:id", products.getById);

// PROTECTED ROUTES (harus login admin)
router.post("/", verifyToken, upload.single("image"), products.create);
router.put("/:id", verifyToken, upload.single("image"), products.update);
router.delete("/:id", verifyToken, products.remove);

module.exports = router;
