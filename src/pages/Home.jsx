import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Hero from "../components/Hero.jsx"; // ⭐ REQUIRED IMPORT
import banner from "../assets/banner.jpg";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recent, setRecent] = useState([]);

  // Load featured products
  useEffect(() => {
    fetch("https://react-ecommerce-qxa5.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.slice(0, 4).map((item) => ({
          ...item,
          oldPrice:
            item.oldPrice !== undefined
              ? item.oldPrice
              : Number(item.price) * 1.25,
        }));
        setProducts(featured);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Load recently viewed
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecent(viewed);
  }, []);

  return (
    <>
      <Hero image={banner} />

      {/* FEATURED */}
      <div className="section container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="section-title">Featured Products</h4>
          <Link to="/products" className="btn btn-outline-primary btn-sm">
            View All Products
          </Link>
        </div>

        <div className="row g-3">
          {products.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY VIEWED */}
      {recent.length > 0 && (
        <div className="section container">
          <h4 className="section-title">Recently Viewed</h4>

          <div className="row g-3">
            {recent.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
