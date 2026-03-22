import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const name = product?.name ?? product?.title ?? "Product";
  const rating = Math.max(0, Math.min(5, Number(product?.rating ?? 0)));

  return (
    <div className="card h-100">
      {/* Image -> link to details */}
      <div className="position-relative overflow-hidden">
        {product?.discount ? (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            -{product.discount}%
          </span>
        ) : null}

        <Link to={`/product/${product.id}`}>
          <img
            src={product?.image}
            alt={name}
            className="card-img-top product-img"
            style={{ objectFit: "cover", height: 220 }}
          />
        </Link>
      </div>

      <div className="card-body d-flex flex-column">
        {/* Title -> link to details */}
        <h6 className="card-title text-truncate">
          <Link to={`/product/${product.id}`} className="text-decoration-none">
            {name}
          </Link>
        </h6>

        {/* Star rating */}
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`${i < rating ? "fas" : "far"} fa-star text-warning`}
            />
          ))}
        </div>

        {/* Price section */}
        <div className="mb-3">
          {product?.oldPrice ? (
            <span className="text-muted text-decoration-line-through me-2">
              ₱{Number(product.oldPrice).toFixed(2)}
            </span>
          ) : null}
          <span className="fw-bold">₱{Number(product?.price ?? 0).toFixed(2)}</span>
        </div>

        {/* Actions */}
        <div className="d-flex gap-2 mt-auto">
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            <i className="fas fa-cart-plus me-2" />
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-outline-secondary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}