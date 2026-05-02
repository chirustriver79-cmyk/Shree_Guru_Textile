import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "../components/css/wishlist.css";

const FILTER_OPTIONS = ["All Items", "Women", "Men", "Festive", "Wedding"];

// Map product category/gender to filter tab
function getTabCategory(product) {
  if (product.category === "Women" || product.gender === "female") return "Women";
  if (product.category === "Men"   || product.gender === "male")   return "Men";
  if (product.occasion === "Festive") return "Festive";
  if (product.occasion === "Wedding") return "Wedding";
  return "All Items";
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [movedToBag, setMovedToBag] = useState({});

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleMoveToBag = (item) => {
    // Add to cart context with selected size
    addToCart(item, selectedSizes[item.id] || null);
    setMovedToBag((prev) => ({ ...prev, [item.id]: true }));
    // Remove from wishlist after animation delay
    setTimeout(() => removeFromWishlist(item.id), 600);
  };

  const filtered =
    activeFilter === "All Items"
      ? wishlist
      : wishlist.filter((item) => {
          return getTabCategory(item) === activeFilter;
        });

  return (
    <div className="wishlist-page">
      {/* Use the shared app Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="wl-breadcrumb">
        <Link to="/">Home</Link>
        <span> › </span>
        <span>Wishlist</span>
      </div>

      {/* Page header */}
      <div className="wl-header">
        <h1 className="wl-title">
          My Wishlist
          <span className="wl-count">({wishlist.length})</span>
        </h1>
        <p className="wl-subtitle">Your saved favourites — ready whenever you are.</p>
      </div>

      {/* Filter tabs */}
      <div className="wl-filters">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f}
            className={`wl-filter-btn${activeFilter === f ? " active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="wl-empty">
          <div className="wl-empty__icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="wl-empty__title">Your wishlist is empty</h2>
          <p className="wl-empty__sub">
            Click the ♡ on any product to save it here.
          </p>
          <button className="wl-empty__cta" onClick={() => navigate("/products")}>
            EXPLORE PRODUCTS
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="wl-empty">
          <h2 className="wl-empty__title">No items in "{activeFilter}"</h2>
          <button className="wl-empty__cta" onClick={() => setActiveFilter("All Items")}>
            VIEW ALL ITEMS
          </button>
        </div>
      ) : (
        <div className="wl-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`wl-card${movedToBag[item.id] ? " wl-card--fade" : ""}`}
            >
              {/* Remove button */}
              <button
                className="wl-card__remove"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
              >
                ×
              </button>

              {/* Badge */}
              {item.badge && (
                <div className={`wl-card__badge wl-card__badge--${item.badgeType || "new"}`}>
                  {item.badge}
                </div>
              )}

              {/* Image */}
              <div className="wl-card__img-wrap" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image} alt={item.name} className="wl-card__img" />
              </div>

              {/* Info */}
              <div className="wl-card__body">
                <p className="wl-card__brand">{item.brand}</p>
                <h3 className="wl-card__name" onClick={() => navigate(`/product/${item.id}`)}>
                  {item.name}
                </h3>

                {/* Price */}
                <div className="wl-card__price-row">
                  <span className="wl-card__price">₹{item.price.toLocaleString("en-IN")}</span>
                  {item.originalPrice && (
                    <span className="wl-card__price-original">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="wl-card__discount">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>

                {/* Size selector */}
                {item.sizes && item.sizes.length > 0 && (
                  <div className="wl-card__sizes">
                    <span className="wl-card__size-label">Size:</span>
                    <div className="wl-card__size-options">
                      {item.sizes.map((sz) => (
                        <button
                          key={sz}
                          className={`wl-card__size-btn${selectedSizes[item.id] === sz ? " active" : ""}`}
                          onClick={() => handleSizeChange(item.id, sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="wl-card__actions">
                  <button
                    className={`wl-card__move-btn${movedToBag[item.id] ? " done" : ""}`}
                    onClick={() => handleMoveToBag(item)}
                    disabled={movedToBag[item.id]}
                  >
                    {movedToBag[item.id] ? "✓ ADDED TO BAG" : "MOVE TO BAG"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue shopping */}
      {wishlist.length > 0 && (
        <div className="wl-continue">
          <button className="wl-continue__btn" onClick={() => navigate("/products")}>
            ← CONTINUE SHOPPING
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
