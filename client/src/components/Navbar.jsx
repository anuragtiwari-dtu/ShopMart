import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);

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

        <Link to="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
