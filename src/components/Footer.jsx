export default function Footer() {
  return (
    <footer className="footer mt-auto pt-4 pb-3">
      <div className="container">

        <div className="row">

          {/* Brand Info */}
          <div className="col-12 col-md-4 mb-3">
            <h5 className="fw-bold mb-2" style={{ color: "var(--text)" }}>
              Pitstop
            </h5>
            <p style={{ color: "var(--text)", opacity: 0.8 }}>
              Your trusted source for premium Formula‑1 merchandise.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4 mb-3">
            <h6 className="fw-bold" style={{ color: "var(--text)" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="col-6 col-md-4 mb-3">
            <h6 className="fw-bold" style={{ color: "var(--text)" }}>
              Connect
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
              <li>
                mailto:pitstop@gmail.com
                  📧 Email Us
              </li>
              <li>
                #
                  🔗 Instagram
              </li>
              <li>
                #
                  🔗 Facebook
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr style={{ borderColor: "var(--border)" }} />

        {/* Bottom Copyright */}
        <div className="text-center" style={{ color: "var(--text)", opacity: 0.7 }}>
          © 2026 Pitstop. All rights reserved.
        </div>

      </div>
    </footer>
  );
}