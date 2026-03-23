import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, increment, decrement, removeFromCart, totalAmount, clearCart } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container py-5 cart-page">
        <h3>Your cart is empty.</h3>
      </div>
    );
  }

  return (
    <div className="container py-4 cart-page">
      <h3 className="mb-4">Shopping Cart</h3>

      <div className="table-responsive">
        <table className="table align-middle cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="d-flex align-items-center gap-2">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <span>{item.name}</span>
                </td>

                <td>₱{Number(item.price).toLocaleString()}</td>

                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-secondary cart-qty-btn"
                      onClick={() => decrement(item.id)}
                    >
                      −
                    </button>

                    <button className="btn cart-qty-value" disabled>
                      {item.qty}
                    </button>

                    <button
                      className="btn btn-outline-secondary cart-qty-btn"
                      onClick={() => increment(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>₱{(item.qty * Number(item.price)).toLocaleString()}</td>

                <td>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-semibold">
                Total
              </td>
              <td className="fw-bold">₱{totalAmount.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Clear cart
        </button>

        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}