import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart (or increase qty if already there)
  const addToCart = useCallback((product, selectedSize = null) => {
    setCart((prev) => {
      const key = `${product.id}_${selectedSize}`;
      const existing = prev.find((p) => p._key === key);
      if (existing) {
        return prev.map((p) =>
          p._key === key ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [
        ...prev,
        {
          _key:          key,
          id:            product.id,
          brand:         product.brand || product.fabric || "SHREE GURU",
          name:          product.name,
          price:         product.price,
          originalPrice: product.originalPrice || null,
          badge:         product.badge || null,
          badgeType:     product.badgeType || null,
          image:         product.image,
          selectedSize,
          quantity:      1,
        },
      ];
    });
  }, []);

  // Remove a specific line from cart
  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((p) => p._key !== key));
  }, []);

  // Update quantity (min 1)
  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((p) => (p._key === key ? { ...p, quantity: qty } : p))
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);
  const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
