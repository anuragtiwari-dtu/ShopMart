const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

// ✅ SERVE IMAGES FROM BACKEND
app.use("/images", express.static("images"));

/* ===== AUTO CREATE TABLE ===== */
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        price NUMERIC,
        image TEXT,
        description TEXT
      );
    `);

    console.log("✅ Products table ready");
  } catch (err) {
    console.error("❌ DB init error:", err);
  }
};

initDB();

/* ===== HOME ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ===== GET ALL PRODUCTS ===== */
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

    // ✅ VALIDATION (prevents 400 confusion)
    if (!name || !price || !image || !description) {
      return res.status(400).json({
        error: "All fields (name, price, image, description) are required",
      });
    }

    const newProduct = await pool.query(
      `INSERT INTO products (name, price, image, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, price, image, description],
    );

    res.status(201).json(newProduct.rows[0]);
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

/* ===== SERVER START ===== */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
