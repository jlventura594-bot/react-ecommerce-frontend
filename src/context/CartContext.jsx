import { createContext, useContext, useMemo, useState } from "react";

export const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartPulseKey, setCartPulseKey] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name ?? product.title ?? "Unnamed",
          price: product.price,
          image: product.image,
          qty: 1,
          product,
        },
      ];
    });

    setCartPulseKey((prev) => prev + 1);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const increment = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)),
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p,
      ),
    );

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((sum, p) => sum + p.qty, 0),
    [cart],
  );

  const totalAmount = useMemo(
    () => cart.reduce((sum, p) => sum + p.qty * (Number(p.price) || 0), 0),
    [cart],
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalItems,
    totalAmount,
    cartPulseKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
