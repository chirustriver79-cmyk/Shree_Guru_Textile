import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useCart } from "../context/CartContext";
import "../components/css/checkout.css";

// ── Helpers ─────────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", duration: "5–7 business days", price: 0 },
  { id: "express",  label: "Express Delivery",  duration: "2–3 business days", price: 149 },
  { id: "same_day", label: "Same Day Delivery",  duration: "By 10 PM today",    price: 299 },
];

function StepCircle({ num, active, done }) {
  return (
    <div className={`ck-step-circle${active ? " active" : ""}${done ? " done" : ""}`}>
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : num}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  // ── Form state ──
  const [form, setForm] = useState({
    fullName: "", mobile: "", countryCode: "+91", pin: "",
    address: "", city: "", state: "",
  });
  const [errors, setErrors] = useState({});

  // ── Delivery ──
  const [delivery, setDelivery] = useState("standard");
  const deliveryCharge = DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0;

  // ── Payment ──
  const [payMethod, setPayMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiVerifying, setUpiVerifying] = useState(false);

  // ── Order placed ──
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() =>
    "SGT" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );

  // ── Steps ──
  const [currentStep, setCurrentStep] = useState(1); // 1=shipping, 2=delivery, 3=payment

  const discount = 0; // wire in coupon discount if needed
  const finalTotal = cartTotal - discount + deliveryCharge;

  // ── Field change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ── Validate shipping ──
  const validateShipping = () => {
    const e = {};
    if (!form.fullName.trim())   e.fullName = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^\d{6}$/.test(form.pin)) e.pin = "Enter a valid 6-digit PIN code";
    if (!form.address.trim())    e.address  = "Address is required";
    if (!form.city.trim())       e.city     = "City / District is required";
    if (!form.state)             e.state    = "Please select a state";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShippingNext = () => {
    if (validateShipping()) setCurrentStep(2);
  };

  // ── UPI verify ──
  const handleVerifyUpi = () => {
    if (!upiId.includes("@")) { alert("Enter a valid UPI ID (e.g. name@upi)"); return; }
    setUpiVerifying(true);
    setTimeout(() => { setUpiVerifying(false); setUpiVerified(true); }, 1200);
  };

  // ── Place order ──
  const handlePlaceOrder = () => {
    if (payMethod === "upi" && !upiVerified) {
      alert("Please verify your UPI ID first."); return;
    }
    clearCart();
    setOrderPlaced(true);
  };

  // ── Order Success Screen ──
  if (orderPlaced) {
    return (
      <div className="ck-page">
        <Header />
        <div className="ck-success">
          <div className="ck-success__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="ck-success__title">Order Placed Successfully!</h2>
          <p className="ck-success__sub">
            Your order <strong>#{orderId}</strong> has been confirmed.<br />
            A confirmation will be sent to your registered details.
          </p>
          <p className="ck-success__delivery">
            Estimated delivery: <strong>{DELIVERY_OPTIONS.find(d=>d.id===delivery)?.duration}</strong>
          </p>
          <div className="ck-success__actions">
            <button className="ck-success__btn" onClick={() => navigate("/")}>
              CONTINUE SHOPPING
            </button>
            <button className="ck-success__btn ck-success__btn--outline" onClick={() => navigate("/profile")}>
              VIEW ORDERS
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Empty cart guard ──
  if (cart.length === 0) {
    return (
      <div className="ck-page">
        <Header />
        <div className="ck-empty">
          <h2>Your bag is empty</h2>
          <button onClick={() => navigate("/products")}>SHOP NOW</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ck-page">
      <Header />

      {/* Breadcrumb */}
      <div className="ck-breadcrumb">
        <Link to="/">Home</Link> <span>›</span>
        <Link to="/cart">Bag</Link> <span>›</span>
        <span>Checkout</span>
      </div>

      {/* Save details notice */}
      <div className="ck-save-notice">
        <div>
          <p className="ck-save-notice__title">Save your details for next time</p>
          <p className="ck-save-notice__sub">Create an account to save, edit, and checkout faster.</p>
        </div>
        <button className="ck-save-notice__btn">Sign In / Register</button>
      </div>

      <h1 className="ck-heading">Checkout</h1>

      {/* Step progress */}
      <div className="ck-steps">
        {["Shipping Address", "Delivery Options", "Payment Method"].map((label, i) => {
          const num = i + 1;
          const active = currentStep === num;
          const done   = currentStep > num;
          return (
            <div key={num} className="ck-step">
              <StepCircle num={num} active={active} done={done} />
              <span className={`ck-step__label${active ? " active" : ""}${done ? " done" : ""}`}>
                {label}
              </span>
              {i < 2 && <div className={`ck-step__line${done ? " done" : ""}`} />}
            </div>
          );
        })}
      </div>

      <div className="ck-layout">
        {/* ── LEFT: form panels ── */}
        <div className="ck-left">

          {/* STEP 1: Shipping */}
          <div className={`ck-panel${currentStep >= 1 ? " open" : ""}`}>
            <div className="ck-panel__head" onClick={() => currentStep > 1 && setCurrentStep(1)}>
              <StepCircle num={1} active={currentStep === 1} done={currentStep > 1} />
              <h2 className="ck-panel__title">Shipping Address</h2>
              {currentStep > 1 && (
                <span className="ck-panel__edit">Edit</span>
              )}
            </div>

            {/* Collapsed summary */}
            {currentStep > 1 && (
              <div className="ck-panel__summary">
                <p>{form.fullName} &nbsp;|&nbsp; +91 {form.mobile}</p>
                <p>{form.address}, {form.city}, {form.state} — {form.pin}</p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="ck-panel__body">
                {/* Full Name */}
                <div className="ck-field">
                  <label className="ck-label">Full Name *</label>
                  <input
                    className={`ck-input${errors.fullName ? " error" : ""}`}
                    name="fullName" placeholder="John Doe"
                    value={form.fullName} onChange={handleChange}
                  />
                  {errors.fullName && <p className="ck-error">{errors.fullName}</p>}
                </div>

                {/* Mobile + PIN row */}
                <div className="ck-row-2">
                  <div className="ck-field">
                    <label className="ck-label">Mobile Number *</label>
                    <div className="ck-phone-wrap">
                      <select
                        className="ck-phone-code"
                        value={form.countryCode}
                        onChange={e => setForm(p => ({ ...p, countryCode: e.target.value }))}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                      </select>
                      <input
                        className={`ck-input ck-input--phone${errors.mobile ? " error" : ""}`}
                        name="mobile" placeholder="98765 43210"
                        maxLength={10} value={form.mobile} onChange={handleChange}
                      />
                    </div>
                    {errors.mobile && <p className="ck-error">{errors.mobile}</p>}
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">PIN Code *</label>
                    <input
                      className={`ck-input${errors.pin ? " error" : ""}`}
                      name="pin" placeholder="110001"
                      maxLength={6} value={form.pin} onChange={handleChange}
                    />
                    {errors.pin && <p className="ck-error">{errors.pin}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="ck-field">
                  <label className="ck-label">Address (House No., Building, Street) *</label>
                  <input
                    className={`ck-input${errors.address ? " error" : ""}`}
                    name="address" placeholder="Flat 2B, Rosewood Apartments, MG Road"
                    value={form.address} onChange={handleChange}
                  />
                  {errors.address && <p className="ck-error">{errors.address}</p>}
                </div>

                {/* City + State row */}
                <div className="ck-row-2">
                  <div className="ck-field">
                    <label className="ck-label">City / District *</label>
                    <input
                      className={`ck-input${errors.city ? " error" : ""}`}
                      name="city" placeholder="New Delhi"
                      value={form.city} onChange={handleChange}
                    />
                    {errors.city && <p className="ck-error">{errors.city}</p>}
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">State *</label>
                    <select
                      className={`ck-input ck-select${errors.state ? " error" : ""}`}
                      name="state" value={form.state} onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="ck-error">{errors.state}</p>}
                  </div>
                </div>

                <button className="ck-next-btn" onClick={handleShippingNext}>
                  DELIVER TO THIS ADDRESS →
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: Delivery Options */}
          <div className={`ck-panel${currentStep >= 2 ? " open" : " locked"}`}>
            <div
              className="ck-panel__head"
              onClick={() => currentStep > 2 && setCurrentStep(2)}
            >
              <StepCircle num={2} active={currentStep === 2} done={currentStep > 2} />
              <h2 className="ck-panel__title">Delivery Options</h2>
              {currentStep > 2 && <span className="ck-panel__edit">Edit</span>}
            </div>

            {currentStep > 2 && (
              <div className="ck-panel__summary">
                <p>{DELIVERY_OPTIONS.find(d => d.id === delivery)?.label} — {DELIVERY_OPTIONS.find(d => d.id === delivery)?.duration}</p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="ck-panel__body">
                {DELIVERY_OPTIONS.map(opt => (
                  <label key={opt.id} className={`ck-delivery-opt${delivery === opt.id ? " selected" : ""}`}>
                    <input
                      type="radio" name="delivery" value={opt.id}
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                    />
                    <div className="ck-delivery-opt__info">
                      <span className="ck-delivery-opt__label">{opt.label}</span>
                      <span className="ck-delivery-opt__duration">{opt.duration}</span>
                    </div>
                    <span className="ck-delivery-opt__price">
                      {opt.price === 0 ? <span className="free">FREE</span> : `₹${opt.price}`}
                    </span>
                  </label>
                ))}
                <button className="ck-next-btn" onClick={() => setCurrentStep(3)}>
                  CONTINUE TO PAYMENT →
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: Payment */}
          <div className={`ck-panel${currentStep >= 3 ? " open" : " locked"}`}>
            <div className="ck-panel__head">
              <StepCircle num={3} active={currentStep === 3} done={false} />
              <h2 className="ck-panel__title">Payment Method</h2>
            </div>

            {currentStep === 3 && (
              <div className="ck-panel__body">

                {/* UPI */}
                <label className={`ck-pay-opt${payMethod === "upi" ? " selected" : ""}`}>
                  <input type="radio" name="pay" value="upi"
                    checked={payMethod === "upi"} onChange={() => { setPayMethod("upi"); setUpiVerified(false); }} />
                  <div className="ck-pay-opt__info">
                    <span className="ck-pay-opt__label">UPI (Google Pay, PhonePe, Paytm)</span>
                    <span className="ck-pay-opt__sub">Try instantly on all applications</span>
                  </div>
                  <span className="ck-pay-opt__tag">0% fee</span>
                </label>

                {payMethod === "upi" && (
                  <div className="ck-upi-wrap">
                    <div className="ck-upi-row">
                      <input
                        className="ck-input"
                        placeholder="Enter UPI ID (e.g. name@upi)"
                        value={upiId}
                        onChange={e => { setUpiId(e.target.value); setUpiVerified(false); }}
                      />
                      <button
                        className={`ck-verify-btn${upiVerified ? " verified" : ""}`}
                        onClick={handleVerifyUpi}
                        disabled={upiVerifying || upiVerified}
                      >
                        {upiVerifying ? "..." : upiVerified ? "✓ Verified" : "Verify"}
                      </button>
                    </div>
                    {upiVerified && <p className="ck-upi-success">UPI ID verified successfully!</p>}
                  </div>
                )}

                {/* Credit / Debit Card */}
                <label className={`ck-pay-opt${payMethod === "card" ? " selected" : ""}`}>
                  <input type="radio" name="pay" value="card"
                    checked={payMethod === "card"} onChange={() => setPayMethod("card")} />
                  <div className="ck-pay-opt__info">
                    <span className="ck-pay-opt__label">Credit / Debit Card</span>
                    <span className="ck-pay-opt__sub">We accept all major cards</span>
                  </div>
                  <div className="ck-pay-opt__cards">
                    <span className="ck-card-icon">VISA</span>
                    <span className="ck-card-icon">MC</span>
                  </div>
                </label>

                {payMethod === "card" && (
                  <div className="ck-card-wrap">
                    <input className="ck-input" placeholder="Card Number" maxLength={19} />
                    <div className="ck-row-2">
                      <input className="ck-input" placeholder="MM / YY" maxLength={7} />
                      <input className="ck-input" placeholder="CVV" maxLength={4} type="password" />
                    </div>
                    <input className="ck-input" placeholder="Name on Card" />
                  </div>
                )}

                {/* Net Banking */}
                <label className={`ck-pay-opt${payMethod === "netbanking" ? " selected" : ""}`}>
                  <input type="radio" name="pay" value="netbanking"
                    checked={payMethod === "netbanking"} onChange={() => setPayMethod("netbanking")} />
                  <div className="ck-pay-opt__info">
                    <span className="ck-pay-opt__label">Net Banking</span>
                    <span className="ck-pay-opt__sub">Choose from a list of banks</span>
                  </div>
                  <span className="ck-pay-opt__tag">🏦</span>
                </label>

                {payMethod === "netbanking" && (
                  <div className="ck-card-wrap">
                    <select className="ck-input ck-select">
                      <option value="">Select Your Bank</option>
                      {["SBI","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra","Bank of Baroda","Punjab National Bank","Canara Bank"].map(b =>
                        <option key={b} value={b}>{b}</option>
                      )}
                    </select>
                  </div>
                )}

                {/* COD */}
                <label className={`ck-pay-opt${payMethod === "cod" ? " selected" : ""}`}>
                  <input type="radio" name="pay" value="cod"
                    checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} />
                  <div className="ck-pay-opt__info">
                    <span className="ck-pay-opt__label">Cash on Delivery (COD)</span>
                    <span className="ck-pay-opt__sub">Pay when your order arrives</span>
                  </div>
                  <span className="ck-pay-opt__tag">💵</span>
                </label>

                <button className="ck-place-btn" onClick={handlePlaceOrder}>
                  Place Order &amp; Pay &nbsp; ₹{finalTotal.toLocaleString("en-IN")}
                </button>

                <p className="ck-secure-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  &nbsp; 100% Secure. Your data is encrypted and never stored.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="ck-right">
          <div className="ck-order-box">
            <h2 className="ck-order-box__title">
              Order Summary <span className="ck-order-box__count">({cart.length} {cart.length === 1 ? "item" : "items"})</span>
            </h2>

            {/* Item list */}
            <div className="ck-order-items">
              {cart.map(item => (
                <div key={item._key} className="ck-order-item">
                  <img src={item.image} alt={item.name} className="ck-order-item__img" />
                  <div className="ck-order-item__info">
                    <p className="ck-order-item__name">{item.name}</p>
                    {item.selectedSize && (
                      <p className="ck-order-item__meta">Size: {item.selectedSize}</p>
                    )}
                    <p className="ck-order-item__meta">Qty: {item.quantity}</p>
                  </div>
                  <span className="ck-order-item__price">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="ck-order-divider" />

            {/* Totals */}
            <div className="ck-order-rows">
              <div className="ck-order-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="ck-order-row ck-order-row--green">
                  <span>Discount</span>
                  <span>− ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="ck-order-row">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? "ck-free" : ""}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="ck-order-divider" />
              <div className="ck-order-row ck-order-row--total">
                <span>Total to Pay</span>
                <span>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
              {deliveryCharge === 0 && (
                <p className="ck-order-saving">
                  (includes free delivery)
                </p>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="ck-trust">
            {[
              { icon: "🔒", text: "Secure Checkout" },
              { icon: "↩️", text: "Easy Returns" },
              { icon: "🚚", text: "Pan-India Delivery" },
            ].map(t => (
              <div key={t.text} className="ck-trust__badge">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
