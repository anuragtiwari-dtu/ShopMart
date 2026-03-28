import "./ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart } = useContext(CartContext);

  // 🔥 Fake old price (for UI)
  const oldPrice = price + 500;
  const savings = oldPrice - price;

  return (
    <div className="card">
      {/* IMAGE */}
      <img src={image} alt={name} />

      {/* TITLE */}
      <h3>{name}</h3>

      {/* PRICES */}
      <p className="old">₹{oldPrice}</p>
      <p className="price">₹{price}</p>

      {/* SAVINGS */}
      <p className="save">You save ₹{savings}</p>

      {/* BUTTON */}
      <button
        onClick={() => {
          addToCart({ id, name, price, image });
          alert(`${name} added to cart 🛒`);
        }}
      >
        Add to cart 🛒
      </button>
    </div>
  );
};

export default ProductCard;
