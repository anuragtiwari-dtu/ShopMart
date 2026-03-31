import "./Navbar.css";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  // Update login state on navigation or storage change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    const handleStorage = () =>
      setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h2 className="logo">
        Shop<span>Mart</span>
      </h2>

      {/* ✅ FIXED SEARCH */}
      <div className="search">
        <input type="text" placeholder="Search for a product" />
      </div>

      {/* LINKS */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/deals">Deals</Link>

        {/* CART */}
        <Link to="/cart">Cart 🛒 ({cart.length})</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Log out
          </button>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
