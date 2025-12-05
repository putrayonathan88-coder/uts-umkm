console.log(">>> RUNNING INDEX.JS FROM BACKEND FOLDER <<<");
console.log(">>> PORT SHOULD BE 3001 <<<");

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// ensure upload folder exists
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve upload images
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// ROUTES
app.use("/admin", require("./routes/admin"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));

// root
app.get("/", (req, res) => res.json({ message: "UMKM Backend ready" }));

// ERROR HANDLER HARUS DI SINI (setelah routes, sebelum listen)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// start server
const PORT = 3001;
app.listen(PORT, () => 
  console.log(`Server running at http://localhost:${PORT}`)
);
