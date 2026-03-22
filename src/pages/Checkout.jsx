import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalAmount, clearCart } = useCart();

  // Simple tax example (12% VAT). Adjust per your spec.
  const TAX_RATE = 0.12;
  const subtotal = Number(totalAmount) || 0;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const grandTotal = Math.round((subtotal + tax) * 100) / 100;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'cod', // cod | card | gcash (example)
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: all required fields non-empty
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert('Please complete all required fields.');
      return;
    }

    // Simulate placing an order (in real life, POST /api/orders)
    // On success:
    clearCart(); // empties global cart, zeros navbar badge
    setSubmitted(true);
    // Optional: navigate after a delay
    setTimeout(() => navigate('/'), 1500);
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="container py-4">
        <h4>Your cart is empty.</h4>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-4">
        <div className="alert alert-success">
          ✅ Order placed successfully! Thank you for your purchase.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Checkout Form */}
        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-header fw-semibold">Checkout</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    name="payment"
                    className="form-select"
                    value={form.payment}
                    onChange={handleChange}
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="gcash">GCash</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-header fw-semibold">Order Summary</div>
            <div className="card-body">
              <ul className="list-group list-group-flush mb-3">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₱{(item.qty * Number(item.price)).toLocaleString('en-PH')}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString('en-PH')}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tax (12%)</span>
                <span>₱{tax.toLocaleString('en-PH')}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₱{grandTotal.toLocaleString('en-PH')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}