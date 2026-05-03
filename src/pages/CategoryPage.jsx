import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useCart } from "../context/CartContext";
import "../components/css/cart.css";

// Suggested "complete your look" items (static accessory picks)
const COMPLETE_LOOK = [
  {
    id: "cl1",
    name: "Sandal Heels Footwear",
    price: 1299,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80",
  },
  {
    id: "cl2",
    name: "Embroidered Potli Bag",
    price: 799,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
  },
  {
    id: "cl3",
    name: "Kundan Jewelry Bangles",
    price: 1099,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },
  {
    id: "cl4",
    name: "Banarasi Silk Dupatta",
    price: 1499,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
  },
];

const COUPON_CODES = {
  SHREEDEAL: 10,
  FESTIVE20: 20,
  SAVE15: 15,
};

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, cartTotal, addToCart } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [addedLook, setAddedLook] = useState({});

  const discount = appliedCoupon ? Math.round(cartTotal * (appliedCoupon.pct / 100)) : 0;
  const deliveryCharge = cartTotal > 999 ? 0 : 99;
  const finalTotal = cartTotal - discount + deliveryCharge;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPON_CODES[code]) {
      setAppliedCoupon({ code, pct: COUPON_CODES[code] });
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code. Try SHREEDEAL, FESTIVE20, or SAVE15.");
    }
  };

  const handleAddLook = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      fabric: "Accessories",
    });
    setAddedLook((prev) => ({ ...prev, [item.id]: true }));
  };

  // ── Empty Bag ──────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link>
          <span> › </span>
          <span>Your Bag</span>
        </div>
        <div className="cart-empty">
          <div className="cart-empty__icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="cart-empty__title">Your bag is empty</h2>
          <p className="cart-empty__sub">but our collection's not</p>
          <div className="cart-empty__actions">
            <button className="cart-empty__cta" onClick={() => navigate("/products")}>
              EXPLORE COLLECTION
            </button>
            <button className="cart-empty__cta cart-empty__cta--outline" onClick={() => navigate("/wishlist")}>
              VIEW WISHLIST
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Filled Bag ─────────────────────────────────────────────
  return (
    <div className="cart-page">
      <Header />

      {/* Breadcrumb */}
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link>
        <span> › </span>
        <span>Your Bag</span>
        <span className="cart-breadcrumb__count"> ({cart.length} {cart.length === 1 ? "item" : "items"})</span>
      </div>

      {/* Delivery notice */}
      <div className="cart-delivery-notice">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {deliveryCharge === 0
          ? "🎉 You've unlocked FREE delivery!"
          : `Add items worth ₹${(999 - cartTotal).toLocaleString("en-IN")} more to get FREE delivery`}
      </div>

      <div className="cart-layout">
        {/* ── Left: Items ── */}
        <div className="cart-items-col">
          <h1 className="cart-title">
            Your Bag <span className="cart-title__count">({cart.reduce((s, p) => s + p.quantity, 0)} items)</span>
          </h1>

          {cart.map((item) => (
            <div key={item._key} className="cart-item">
              {/* Image */}
              <div className="cart-item__img-wrap" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image} alt={item.name} className="cart-item__img" />
                {item.badge && (
                  <div className={`cart-item__badge cart-item__badge--${item.badgeType || "new"}`}>
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="cart-item__body">
                <div className="cart-item__top-row">
                  <div>
                    <p className="cart-item__brand">{item.brand}</p>
                    <h3 className="cart-item__name" onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </h3>
                    {item.selectedSize && (
                      <p className="cart-item__size">Size: <strong>{item.selectedSize}</strong></p>
                    )}
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item._key)}
                    aria-label="Remove from cart"
                  >
                    ×
                  </button>
                </div>

                {/* Price */}
                <div className="cart-item__price-row">
                  <span className="cart-item__price">₹{item.price.toLocaleString("en-IN")}</span>
                  {item.originalPrice && (
                    <>
                      <span className="cart-item__original">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="cart-item__saved">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>

                {/* Qty */}
                <div className="cart-item__qty-row">
                  <span className="cart-item__qty-label">Qty:</span>
                  <div className="cart-item__qty-ctrl">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQty(item._key, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >−</button>
                    <span className="cart-item__qty-val">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQty(item._key, item.quantity + 1)}
                    >+</button>
                  </div>
                  <span className="cart-item__subtotal">
                    = ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <button className="cart-continue-btn" onClick={() => navigate("/products")}>
            ← CONTINUE SHOPPING
          </button>
        </div>

        {/* ── Right: Summary ── */}
        <div className="cart-summary-col">

          {/* Coupon */}
          <div className="cart-coupon">
            <p className="cart-coupon__label">Apply Coupon</p>
            <div className="cart-coupon__row">
              <input
                type="text"
                className="cart-coupon__input"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              />
              <button className="cart-coupon__btn" onClick={handleApplyCoupon}>Apply</button>
            </div>
            {couponError && <p className="cart-coupon__error">{couponError}</p>}
            {appliedCoupon && (
              <p className="cart-coupon__success">
                ✓ "{appliedCoupon.code}" applied — {appliedCoupon.pct}% off!{" "}
                <button className="cart-coupon__remove" onClick={() => { setAppliedCoupon(null); setCouponInput(""); }}>
                  Remove
                </button>
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Bag Total</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              {appliedCoupon && (
                <div className="cart-summary__row cart-summary__row--green">
                  <span>Bag Discount ({appliedCoupon.pct}%)</span>
                  <span>− ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="cart-summary__row">
                <span>Delivery Fee</span>
                <span className={deliveryCharge === 0 ? "cart-summary__free" : ""}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {appliedCoupon && (
              <p className="cart-summary__saving">
                You are saving ₹{discount.toLocaleString("en-IN")} on this order!
              </p>
            )}

            <button className="cart-checkout-btn" onClick={() => navigate("/checkout")}>
              PROCEED TO CHECKOUT →
            </button>

            {/* Payment icons */}
            <div className="cart-payment-icons">
              {["VISA", "MC", "UPI", "PayTM"].map((m) => (
                <span key={m} className="cart-payment-icon">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Your Look */}
      <div className="cart-look">
        <h2 className="cart-look__title">Complete Your Look</h2>
        <div className="cart-look__grid">
          {COMPLETE_LOOK.map((item) => (
            <div key={item.id} className="cart-look__card">
              <img src={item.image} alt={item.name} className="cart-look__img" />
              <p className="cart-look__name">{item.name}</p>
              <p className="cart-look__price">₹{item.price.toLocaleString("en-IN")}</p>
              <button
                className={`cart-look__btn${addedLook[item.id] ? " added" : ""}`}
                onClick={() => handleAddLook(item)}
                disabled={addedLook[item.id]}
              >
                {addedLook[item.id] ? "✓ Added" : "+ Add"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
