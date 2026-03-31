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
