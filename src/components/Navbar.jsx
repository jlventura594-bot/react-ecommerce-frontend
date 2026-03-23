import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        backgroundColor: "var(--nav-bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        {/* LOGO + BRAND */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          to="/"
          style={{ color: "var(--text)" }}
        >
          /logo.png Pitstop
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Dark Mode */}
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀"}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative"
            >
              <i className="fas fa-shopping-cart"></i>
              {totalQty > 0 && (
                <span className="badge bg-danger text-white position-absolute top-0 start-100 translate-middle px-2 py-1 rounded-circle">
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
