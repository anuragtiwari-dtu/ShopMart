# ShopMart Project Report

**Submitted by:** Anurag Tiwari
**Date:** March 29, 2026

---

## Project Overview
ShopMart is a full-stack e-commerce web application built with React (frontend), Node.js/Express and Firebase Functions (backend), and Firestore (database). The project is deployed using Firebase Hosting.

---

## Technologies Used
- **Frontend:** React, Vite, React Router, Context API
- **Backend:** Node.js, Express, Firebase Functions
- **Database:** Firestore (Firebase)
- **Hosting:** Firebase Hosting (Classic)
- **Styling:** CSS

---

## Features Implemented
- **Product Listing:** Products are displayed on the homepage using a ProductGrid component. Data is fetched from Firestore or a local array.
- **Cart Functionality:** Uses React Context (CartContext) to manage cart state and allow adding products to the cart.
- **Authentication Pages:** Login and Signup pages are present (UI implemented).
- **Navigation:** Responsive Navbar with links to Home, Categories, Deals, Cart (with item count), and Login.
- **Search Bar:** Present in the Navbar for product search (UI only).
- **API Endpoints:** Express server and Firebase Functions both provide `/products` endpoints for getting, adding, and deleting products.
- **Firebase Hosting:** The site is deployed to Firebase Hosting at https://shopmart-a623f.web.app

---

## Code/Folder Structure
- `client/` — React frontend
  - `src/components/` — UI components (Navbar, Hero, ProductCard, ProductGrid)
  - `src/context/CartContext.jsx` — Cart state management
  - `src/data/Products.js` — Sample product data
  - `src/pages/` — Home, Login, Signup pages
  - `App.jsx` — Main app with routing
- `server/` — Node.js/Express backend (for local API)
- `functions/` — Firebase Cloud Functions backend (for serverless API)
- `firebase.json` — Firebase Hosting and Firestore config
- `.firebaserc` — Firebase project alias

---

## Notable Code Snippets
**App Routing (client/src/App.jsx):**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/categories" element={<h1>Categories Page</h1>} />
  <Route path="/cart" element={<h1>Cart Page</h1>} />
</Routes>
```

**Cart Context (client/src/context/CartContext.jsx):**
```js
const [cart, setCart] = useState([]);
const addToCart = (product) => setCart((prev) => [...prev, product]);
```

**Express API Example (server/index.js):**
```js
app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  res.json(result.rows);
});
```

**Firebase Function Example (functions/index.js):**
```js
app.get("/products", async (req, res) => {
  const snapshot = await db.collection("products").orderBy("id").get();
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json(products);
});
```

---

## Firebase Hosting Link
- **Live Site:** https://shopmart-a623f.web.app

---

## Conclusion
This project demonstrates a complete e-commerce workflow with modern web technologies, cloud database, and scalable hosting. The codebase is modular and ready for further enhancements such as authentication logic, payment integration, and admin dashboards.

---

**End of Report**
