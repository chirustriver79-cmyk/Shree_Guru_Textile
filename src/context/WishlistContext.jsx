import { createContext, useContext, useState, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = useCallback((product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [
        ...prev,
        {
          id:            product.id,
          brand:         product.brand || product.fabric || "SHREE GURU",
          name:          product.name,
          price:         product.price,
          originalPrice: product.originalPrice || null,
          badge:         product.badge || null,
          badgeType:     product.badgeType || null,
          category:      product.category || "All",
          gender:        product.gender || null,
          occasion:      product.occasion || null,
          sizes:         product.sizes || null,
          image:         product.image,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((p) => p.id === id),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
