import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./components/ProductGrid"; // ✅ IMPORTANT
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<h1>Categories Page</h1>} />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
