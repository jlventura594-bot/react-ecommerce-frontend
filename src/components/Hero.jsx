import { Link } from "react-router-dom";

export default function Hero({ image }) {
  return (
    <div className="hero-wrapper position-relative rounded shadow-sm mb-5 overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt="F1 Banner"
        className="w-100 hero-img"
        style={{
          height: "360px",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <div
        className="position-absolute top-50 start-50 translate-middle text-center px-3"
        style={{
          color: "white",
          textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        <h1 className="fw-bold mb-2">Your #1 F1 Merchandise Store</h1>
        <p className="lead mb-3">Premium collectibles, apparel & gear.</p>

        <Link to="/products" className="btn btn-primary btn-lg px-4">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
