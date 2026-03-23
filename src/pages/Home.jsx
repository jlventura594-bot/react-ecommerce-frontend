import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import banner from '../assets/banner.jpg';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recent, setRecent] = useState([]);

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

  // Load Recently Viewed from localStorage
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecent(viewed);
  }, []);

  return (
    <>
      {/* Store Banner */}
      <div className="container py-4">
        <img
          src={banner}
          alt="Store banner"
          className="img-fluid rounded shadow-sm w-100"
          style={{ maxHeight: 320, objectFit: "cover" }}
        />
      </div>

      {/* Featured */}
      <div className="container pb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Featured Products</h4>
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

      {/* ⭐ Recently Viewed */}
      {recent.length > 0 && (
        <div className="container pb-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Recently Viewed</h4>
          </div>

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