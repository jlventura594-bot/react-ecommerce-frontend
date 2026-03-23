import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef(null);

  const name = product?.name ?? product?.title ?? "Product";
  const rating = Math.max(0, Math.min(5, Number(product?.rating ?? 0)));

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
    }, 700);
  };

  return (
    <div
      className="card h-100 product-card shadow-sm border-0"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text)",
        transition: "0.25s ease",
        borderRadius: "10px",
      }}
    >
      <div className="position-relative overflow-hidden rounded-top">
        {product?.discount ? (
          <span
            className="badge position-absolute top-0 start-0 m-2"
            style={{
              backgroundColor: "#ff4d4f",
              fontSize: "0.8rem",
              padding: "5px 8px",
              borderRadius: "4px",
            }}
          >
            -{product.discount}%
          </span>
        ) : null}

        <Link to={`/product/${product.id}`}>
          <img
            src={product?.image}
            alt={name}
            className="card-img-top"
            style={{
              objectFit: "cover",
              height: "220px",
              transition: "transform 0.3s ease",
            }}
          />
        </Link>
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title text-truncate fw-semibold mb-1">
          <Link
            to={`/product/${product.id}`}
            className="text-decoration-none"
            style={{ color: "var(--text)" }}
          >
            {name}
          </Link>
        </h6>

        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`${i < rating ? "fas" : "far"} fa-star`}
              style={{ color: "#f1c40f", fontSize: "0.9rem" }}
            />
          ))}
        </div>

        <div className="mb-3">
          {product?.oldPrice ? (
            <span className="text-muted text-decoration-line-through me-2">
              ₱{Number(product.oldPrice).toLocaleString("en-PH")}
            </span>
          ) : null}

          <span className="fw-bold fs-5" style={{ color: "var(--text)" }}>
            ₱{Number(product.price).toLocaleString("en-PH")}
          </span>
        </div>

        <div className="d-flex gap-2 mt-auto">
          <button
            className={`btn btn-primary flex-fill add-cart-btn ${
              justAdded ? "is-added" : ""
            }`}
            onClick={handleAddToCart}
            style={{ fontWeight: "600" }}
          >
            <i
              className={`fas ${justAdded ? "fa-check" : "fa-cart-plus"} me-2`}
            ></i>
            {justAdded ? "Added!" : "Add"}
          </button>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-secondary"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}