import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        setLoading(false);
      }
    };
    fetchProducts();
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
