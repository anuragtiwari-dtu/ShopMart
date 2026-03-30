/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀 (Cloud Functions + Firestore)");
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").orderBy("id").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add product
app.post("/products", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    // Generate a new product with auto-increment id (not native in Firestore, so use timestamp or custom logic)
    const productsRef = db.collection("products");
    const snapshot = await productsRef.orderBy("id", "desc").limit(1).get();
    let newId = 1;
    if (!snapshot.empty) {
      newId = (snapshot.docs[0].data().id || 0) + 1;
    }
    const newProduct = { id: newId, name, price, image, description };
    const docRef = await productsRef.add(newProduct);
    res.json({ id: docRef.id, ...newProduct });
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// Delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsRef = db.collection("products");
    const snapshot = await productsRef.where("id", "==", parseInt(id)).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "Product not found" });
    }
    await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.json({ message: "User already exists" });
    }
    await usersRef.add({ email, password });
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: "Error signing up" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection("users");
    const snapshot = await usersRef
      .where("email", "==", email)
      .where("password", "==", password)
      .get();
    if (snapshot.empty) {
      return res.json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

exports.api = functions.https.onRequest(app);
