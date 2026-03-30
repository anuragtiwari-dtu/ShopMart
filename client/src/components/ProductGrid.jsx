import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong");
        setLoading(false);
      });
  }, []);

  return (
    <div className="products-page">
      <h2>Today’s Best Offers</h2>

      <div className="product-grid">
        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              oldPrice={item.oldprice || item.price + 500} // fallback
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
