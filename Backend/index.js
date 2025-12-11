console.log(">>> RUNNING INDEX.JS FROM BACKEND FOLDER <<<")
console.log(">>> PORT SHOULD BE 3001 <<<");

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

const UPLOAD_DIR = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

const sessionStore = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "umkmdb",
});

app.use(
  session({
    key: "umkm_session_id",
    secret: "super_secret_long_string_change_this",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,

      // untuk localhost: secure=false OK
      secure: false,

      // jika secure=false → gunakan "lax"
      sameSite: "lax",

      maxAge: 1000 * 60 * 60 * 24, // 24 jam
    },
  })
);

app.use("/admin", require("./routes/admin"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));

// ROOT
app.get("/", (req, res) => {
  res.json({ message: "UMKM Backend Running OK" });
});

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`>>> BACKEND READY at http://localhost:${PORT}`);
});
