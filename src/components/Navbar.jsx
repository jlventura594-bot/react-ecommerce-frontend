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
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "var(--text)" }}>
          Pitstop
        </Link>

        {/* Mobile Hamburger */}
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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>

          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">

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

            {/* Dark Mode Toggle */}
            <button
              className="btn btn-outline-secondary"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙" : "☀"}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}