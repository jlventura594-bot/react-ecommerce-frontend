export default function Footer() {
  return (
    <footer className="footer mt-auto pt-4 pb-3">
      <div className="container">

        <div className="row">

          {/* BRAND SECTION */}
          <div className="col-12 col-md-4 mb-3">
            <h5 className="fw-bold" style={{ color: "var(--text)" }}>
              Pitstop
            </h5>
            <p style={{ color: "var(--text)", opacity: 0.8 }}>
              Your trusted source for premium Formula‑1 merchandise.
            </p>
          </div>

          {/* QUICK LINKS (STATIC TEXT ONLY) */}
          <div className="col-6 col-md-4 mb-3">
            <h6 className="fw-bold" style={{ color: "var(--text)" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: "1.8", color: "var(--text)" }}>
              <li className="link-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="link-item">
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="link-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT SECTION (STATIC TEXT ONLY) */}
          <div className="col-6 col-md-4 mb-3">
            <h6 className="fw-bold" style={{ color: "var(--text)" }}>
              Connect
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: "1.8", color: "var(--text)" }}>
              <li>Email: pitstop@gmail.com</li>
              <li>Instagram: @pistopshop_ph</li>
              <li>Facebook: Pistop Shop</li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <hr style={{ borderColor: "var(--border)" }} />

        {/* COPYRIGHT */}
        <div className="text-center" style={{ color: "var(--text)", opacity: 0.7 }}>
          © 2026 Pitstop. All rights reserved.
        </div>

      </div>
    </footer>
  );
}