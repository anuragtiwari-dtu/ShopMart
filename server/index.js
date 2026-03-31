const pool = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== TEMP USER STORAGE ===== */
let users = [];

/* ===== HOME ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ===== PRODUCTS API ===== */
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===== ADD PRODUCT ===== */
app.post("/products", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (name, price, image, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, image, description],
    );

    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error adding product" });
  }
});

/* ===== DELETE PRODUCT ===== */
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM products WHERE id = $1", [id]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error deleting product" });
  }
});

/* ===== AUTH ===== */
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ email, password });

  res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

/* ===== SERVER START ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
