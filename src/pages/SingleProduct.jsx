// src/pages/SingleProduct.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function SingleProduct() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetch(`https://react-ecommerce-qxa5.onrender.com/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProduct({
          ...data,
          oldPrice:
            data.oldPrice !== undefined ? data.oldPrice : Number(data.price) * 1.25,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load product:", err);
        setError("Unable to load product. Please try again.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-4">
        <h5>Loading product…</h5>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error || "Product not found."}</div>
        <Link to="/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    );
  }

  const rating = Math.max(0, Math.min(5, Number(product.rating ?? 0)));

  return (
    <div className="container py-4">
      <div className="mb-3">
        <Link to="/products" className="btn btn-outline-secondary">
          ← Back to Products
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="position-relative">
            {product.discount ? (
              <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                -{product.discount}%
              </span>
            ) : null}
            <img
              src={product.image}
              alt={product.name ?? "Product"}
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: "cover", maxHeight: 480 }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h3 className="mb-2">{product.name}</h3>

          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`${i < rating ? "fas" : "far"} fa-star text-warning`}
              />
            ))}
          </div>

          <div className="mb-3">
            {product.oldPrice ? (
              <span className="text-muted text-decoration-line-through me-2">
                ₱{Number(product.oldPrice).toLocaleString("en-PH")}
              </span>
            ) : null}
            <span className="h4 fw-bold">
              ₱{Number(product.price).toLocaleString("en-PH")}
            </span>
          </div>

          {product.category && (
            <p className="text-muted mb-4">
              Category: <span className="badge bg-secondary">{product.category}</span>
            </p>
          )}

          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              <i className="fas fa-cart-plus me-2" />
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-outline-primary">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}