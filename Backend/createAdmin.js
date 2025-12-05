const db = require("./config/db");
const bcrypt = require("bcrypt");

async function createAdmin() {
  const username = "admin";
  const password = "admin123"; // password asli yang ingin dipakai

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO admins (username, password) VALUES (?, ?)",
    [username, hashed],
    (err) => {
      if (err) console.error(err);
      else console.log("Admin berhasil dibuat!");
    }
  );
}

createAdmin();
