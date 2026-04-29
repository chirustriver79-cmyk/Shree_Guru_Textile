// src/pages/ProductPage.jsx
import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../components/css/product.css";

// ─── Data ──────────────────────────────────────────────────────────────────────

const COLORS = [
  { id: "green", hex: "#2e7d52", name: "Emerald Green" },
  { id: "red",   hex: "#c0392b", name: "Ruby Red" },
  { id: "blue",  hex: "#2980b9", name: "Royal Blue" },
  { id: "navy",  hex: "#1a2744", name: "Midnight Navy" },
];

const TABS = [
  { id: "details", label: "Product Details" },
  { id: "styling", label: "Occasion & Styling" },
  { id: "care",    label: "Care Instructions" },
  { id: "refund",  label: "Refund Policy" },
];

const LOOK_ITEMS = [
  { icon: "📿", name: "Kundan Choker Necklace",  price: 4499 },
  { icon: "💛", name: "Temple Jewellery Bangles", price: 1999 },
  { icon: "👜", name: "Embroidered Potli Clutch", price: 999  },
  { icon: "👡", name: "Metallic Block Heels",     price: 1999 },
];

const REVIEWS = [
  { name: "Priya Sharma",   meta: "Verified Buyer · 2 weeks ago", rating: 5,
    text: "Absolutely stunning saree! The colour is exactly as shown, a rich deep green. The zari work is intricate and looks very premium. Wore it for a wedding and received so many compliments!" },
  { name: "Anjali Desai",   meta: "Verified Buyer · 1 month ago", rating: 4,
    text: "Good quality silk and nice drape. The blouse piece provided is generous. Took a day longer than expected, but the product itself is flawless." },
  { name: "Meenakshi Iyer", meta: "Verified Buyer · 3 weeks ago", rating: 5,
    text: "Genuine Kanjivaram silk — you can feel the weight and quality immediately. The gold zari border is exquisite. Perfect for my daughter's reception. Will definitely order again!" },
];

const RATING_BARS = [
  { label: "5★", pct: 78 },
  { label: "4★", pct: 14 },
  { label: "3★", pct: 5  },
  { label: "2★", pct: 2  },
  { label: "1★", pct: 1  },
];

const SPECS = [
  "Fabric: Pure Kanjivaram Silk",
  "Pattern: Zari Woven Motif",
  "Border: Heavy Gold Zari",
  "Blouse Piece: Included (Unstitched)",
  "Saree Length: 6.5 Meters",
];

const OFFERS = [
  { icon: "🏦", title: "Bank Offer",    desc: "10% off on HDFC Bank Credit Cards" },
  { icon: "📦", title: "Free Shipping", desc: "On all orders above ₹2000" },
  { icon: "↩️", title: "Easy Returns",  desc: "7-day hassle free return policy" },
];

// ─── Product Images (Unsplash — Kanjivaram / silk saree themed) ──────────────

const PRODUCT_IMAGES = [
  {
    url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSqWEykRYAOgH-3pZSBhR-sgj5_sKQV4FWvgvtxqpx4Bd3w0ty_GoOvvxzu_wt-6DK66kQ0tRns2SNpzO1F-F1JHfh5xEx4yuv2M5r5YaXk",
    alt: "Emerald green silk saree draped elegantly",
  },
  {
    url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcThyR3edhn9wjouIR3bHMDD8PysSMXNO9ccKJicOu-rICl7lsMpudAnD9YgWQLG1fM9hdAXso3uHx7IFUtdfD3CuhlmD-h4pSKfDV_YKgZT",
    alt: "Close-up of gold zari woven border on silk saree",
  },
  {
    url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTUnBd023RY7R8J9UnnzeX26QP7p8AHUmwu7tL7PiOaKF6ZWY4W-xi_qDAghDSw4pnizTccXVsYUvhwcqMJFnFtNliSI1uhMBlXMUNGCSV5",
    alt: "Detailed zari motif embroidery on green silk",
  },
  {
    url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT1qmG2HcVhuBvHpC3T703_AvDHKnwJoS97YIPyaUqS2WpLkaqoehGOeQ3U5XJv-NjsBBQge_3hWUDYn5BjrAATsLRzIag4cbHWMy7FQiI",
    alt: "Bridal saree look with traditional jewellery",
  },
  // {
  //   // url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSJPWPkFYTWlDD6zTEBmz9xU9IwT63Xgg9tvMxbmmkJzEQs3-UfTH0e5QK5wYFTYNcW4gZPVQM8RoFHjBGB-Wbe87qb1X3taEHZDAZi_1sBL9ML7D6LvY71BzA",
  //   // alt: "Saree pallu with intricate gold border",
  // },
];

// ─── Look Item Images ──────────────────────────────────────────────────────────

const LOOK_IMAGES = [
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&q=80",
  "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=300&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Stars({ rating, size }) {
  return (
    <span className={size === "lg" ? "pp-stars pp-stars--lg" : "pp-stars"}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= Math.round(rating) ? "pp-star" : "pp-star pp-star--empty"}>★</span>
      ))}
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize,  setSelectedSize]  = useState("Custom Stitch");
  const [activeImg,     setActiveImg]     = useState(0);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [pincode,       setPincode]       = useState("");
  const [deliveryMsg,   setDeliveryMsg]   = useState(null);
  const [activeTab,     setActiveTab]     = useState("details");
  const [addedItems,    setAddedItems]    = useState({});
  const [toast,         setToast]         = useState(null);
  const [imgError,      setImgError]      = useState({});

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function checkDelivery() {
    if (/^\d{6}$/.test(pincode)) {
      setDeliveryMsg({ ok: true,  msg: "✓ Delivery available in 3–5 business days" });
    } else {
      setDeliveryMsg({ ok: false, msg: "✗ Please enter a valid 6-digit pincode" });
    }
  }

  function addLook(idx) {
    setAddedItems(p => ({ ...p, [idx]: true }));
    showToast("🛍 Added to bag!");
  }

  function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

  function handleImgError(idx) {
    setImgError(p => ({ ...p, [idx]: true }));
  }

  return (
    <div className="pp-root">
      <Header />

      <main className="pp-main">

        {/* ── Breadcrumb ── */}
        <div className="pp-bc">
          <span>Home</span><span className="pp-bc-sep">›</span>
          <span>Women</span><span className="pp-bc-sep">›</span>
          <span>Sarees</span><span className="pp-bc-sep">›</span>
          <span className="pp-bc-active">Emerald Green Zari Woven Silk Saree</span>
        </div>

        {/* ── Hero product section ── */}
        <div className="pp-hero">

          {/* Left: Gallery */}
          <div className="pp-gallery">
            {/* Thumbnail strip */}
            <div className="pp-thumbstrip">
              {PRODUCT_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className={"pp-thumb" + (activeImg === i ? " pp-thumb--on" : "")}
                  onClick={() => setActiveImg(i)}
                  aria-label={img.alt}
                >
                  {imgError[i] ? (
                    <div className="pp-thumb-fallback">{i + 1}</div>
                  ) : (
                    <img
                      src={img.url}
                      alt={img.alt}
                      onError={() => handleImgError(i)}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="pp-main-img">
              <button
                className={"pp-wish" + (wishlisted ? " pp-wish--on" : "")}
                onClick={() => setWishlisted(w => !w)}
                aria-label="Toggle wishlist"
              >
                {wishlisted ? "♥" : "♡"}
              </button>

              {imgError[activeImg] ? (
                <FallbackSaree />
              ) : (
                <img
                  src={PRODUCT_IMAGES[activeImg].url}
                  alt={PRODUCT_IMAGES[activeImg].alt}
                  className="pp-main-img-el"
                  onError={() => handleImgError(activeImg)}
                />
              )}

              {/* Prev / Next arrows */}
              <button className="pp-arrow pp-arrow--prev" onClick={() => setActiveImg(i => (i - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)}>‹</button>
              <button className="pp-arrow pp-arrow--next" onClick={() => setActiveImg(i => (i + 1) % PRODUCT_IMAGES.length)}>›</button>

              {/* Dot indicators */}
              <div className="pp-dots">
                {PRODUCT_IMAGES.map((_, i) => (
                  <span key={i} className={"pp-dot" + (activeImg === i ? " pp-dot--on" : "")} onClick={() => setActiveImg(i)} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="pp-info">
            <p className="pp-cat">KANJIVARAM SILK</p>
            <h1 className="pp-title">Emerald Green Zari Woven Silk Saree</h1>

            <div className="pp-rating-bar">
              <Stars rating={4.8} />
              <span className="pp-r-val">4.8</span>
              <span className="pp-r-ct">(1,345 Reviews)</span>
            </div>

            <hr className="pp-hr" />

            <div className="pp-price-row">
              <span className="pp-price">{fmt(8499)}</span>
              <span className="pp-mrp">{fmt(10625)}</span>
              <span className="pp-offbadge">20% OFF</span>
            </div>
            <p className="pp-taxnote">Inclusive of all taxes</p>

            <hr className="pp-hr" />

            {/* Color */}
            <p className="pp-lbl">Color: <strong>{selectedColor.name}</strong></p>
            <div className="pp-swatches">
              {COLORS.map(c => (
                <button
                  key={c.id}
                  className={"pp-swatch" + (selectedColor.id === c.id ? " pp-swatch--on" : "")}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(c)}
                  title={c.name}
                />
              ))}
            </div>

            {/* Size */}
            <div className="pp-size-hdr">
              <p className="pp-lbl" style={{ marginBottom: 0 }}>Size</p>
              <button className="pp-guide-link">📐 Size Guide</button>
            </div>
            <div className="pp-sizes">
              {["Unstitched", "Custom Stitch"].map(s => (
                <button
                  key={s}
                  className={"pp-sizebtn" + (selectedSize === s ? " pp-sizebtn--on" : "")}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Delivery */}
            <div className="pp-delivery-box">
              <p className="pp-delivery-hdr">🚚 Check Delivery</p>
              <div className="pp-delivery-row">
                <input
                  className="pp-pin"
                  type="text"
                  placeholder="Enter Pincode"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                />
                <button className="pp-pin-btn" onClick={checkDelivery}>Check</button>
              </div>
              {deliveryMsg && (
                <p style={{ fontSize: 11, marginTop: 7, color: deliveryMsg.ok ? "#2e7d52" : "#c94a6a" }}>
                  {deliveryMsg.msg}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="pp-ctas">
              <button className="pp-cta-primary" onClick={() => showToast("🛍 Added to bag!")}>🛍 Add to Bag</button>
              <button className="pp-cta-outline">Buy Now</button>
            </div>

            {/* Trust badges */}
            <div className="pp-trust">
              {["100% Authentic Silk", "Free Returns", "Secure Payment", "Expert Crafted"].map(b => (
                <span key={b} className="pp-badge-pill">✓ {b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="pp-tabs-section">
          <div className="pp-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={"pp-tab" + (activeTab === t.id ? " pp-tab--on" : "")}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pp-tab-content">
            {activeTab === "details" && (
              <div className="pp-about-grid">
                <div>
                  <h2 className="pp-sec-title">About the Saree</h2>
                  <p className="pp-para">
                    Exude elegance in this exquisite Emerald Green Kanjivaram Silk Saree, featuring an intricate
                    gold zari woven border and pallu. Handcrafted by master weavers, the pure silk fabric offers
                    a rich drape and lustrous sheen perfect for festive occasions and weddings.
                  </p>
                  <h3 className="pp-specs-title">Specifications</h3>
                  <ul className="pp-specs">
                    {SPECS.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div className="pp-offers-box">
                  <p className="pp-offers-hdr">✦ SPECIAL OFFERS</p>
                  {OFFERS.map(o => (
                    <div className="pp-offer" key={o.title}>
                      <span className="pp-offer-icon">{o.icon}</span>
                      <div>
                        <p className="pp-offer-title">{o.title}</p>
                        <p className="pp-offer-desc">{o.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "styling" && (
              <div><h2 className="pp-sec-title">Occasion &amp; Styling Tips</h2>
              <p className="pp-para">This Kanjivaram silk saree is ideal for weddings, festive celebrations, and cultural events. Pair it with a contrast raw silk blouse in deep maroon or gold to accentuate the emerald tone. Complete the look with polki or temple jewellery, traditional juttis, and a neat bun adorned with jasmine flowers for a timeless South Indian aesthetic.</p></div>
            )}
            {activeTab === "care" && (
              <div><h2 className="pp-sec-title">Care Instructions</h2>
              <p className="pp-para">Dry clean only. Do not wash in water. Store in a muslin cloth to preserve the zari work. Avoid prolonged exposure to direct sunlight. Keep away from moisture and perfumes. Iron on low heat with a pressing cloth to protect the silk and zari. Proper care ensures the saree retains its lustre for generations.</p></div>
            )}
            {activeTab === "refund" && (
              <div><h2 className="pp-sec-title">Refund Policy</h2>
              <p className="pp-para">We accept returns within 7 days of delivery for items in original, unused condition with tags intact. Custom-stitched blouses are non-returnable. Refunds are processed within 5–7 business days to the original payment method. For exchanges or queries, please contact our support team via the Help Centre.</p></div>
            )}
          </div>
        </div>

        {/* ── Complete the Look ── */}
        <div className="pp-look-section">
          <h2 className="pp-look-hdr">Complete The Look</h2>
          <div className="pp-look-grid">
            {LOOK_ITEMS.map((item, idx) => (
              <div className="pp-look-card" key={idx}>
                <div className="pp-look-img">
                  <img
                    src={LOOK_IMAGES[idx]}
                    alt={item.name}
                    onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  />
                  <span className="pp-look-img-fallback" style={{ display: "none" }}>{item.icon}</span>
                </div>
                <div className="pp-look-body">
                  <p className="pp-look-name">{item.name}</p>
                  <div className="pp-look-row">
                    <span className="pp-look-price">{fmt(item.price)}</span>
                    {addedItems[idx]
                      ? <span className="pp-look-done">✓ Added</span>
                      : <button className="pp-look-add" onClick={() => addLook(idx)}>+ Add</button>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ratings & Reviews ── */}
        <div className="pp-reviews-wrap">
          <h2 className="pp-reviews-hdr">Ratings &amp; Reviews</h2>
          <div className="pp-reviews-grid">
            <div className="pp-rating-card">
              <span className="pp-big-num">4.8</span>
              <Stars rating={4.8} size="lg" />
              <p className="pp-based-on">Based on 1,345 Reviews</p>
              <div className="pp-bars">
                {RATING_BARS.map(b => (
                  <div className="pp-bar-row" key={b.label}>
                    <span className="pp-bar-lbl">{b.label}</span>
                    <div className="pp-bar-track"><div className="pp-bar-fill" style={{ width: b.pct + "%" }}/></div>
                    <span className="pp-bar-pct">{b.pct}%</span>
                  </div>
                ))}
              </div>
              <button className="pp-write-btn">Write a Review</button>
            </div>

            <div className="pp-review-list">
              {REVIEWS.map((r, i) => (
                <div className="pp-review-card" key={i}>
                  <div className="pp-review-top">
                    <div>
                      <p className="pp-reviewer">{r.name}</p>
                      <p className="pp-rev-meta">{r.meta}</p>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="pp-rev-text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
      {toast && <div className="pp-toast">{toast}</div>}
    </div>
  );
}

// ─── Fallback SVG (shown if all images fail to load) ─────────────────────────

function FallbackSaree() {
  return (
    <svg viewBox="0 0 400 530" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ background: "#f5f2ed" }}>
      <defs>
        <pattern id="fb-zari" patternUnits="userSpaceOnUse" width="14" height="14">
          <rect width="14" height="14" fill="#1a5c35"/>
          <circle cx="7" cy="7" r="1.8" fill="#c9a227" opacity="0.65"/>
          <circle cx="0" cy="0" r="1" fill="#c9a227" opacity="0.4"/>
          <circle cx="14" cy="14" r="1" fill="#c9a227" opacity="0.4"/>
        </pattern>
        <pattern id="fb-bdr" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#c9a227"/>
          <rect x="2.5" y="2.5" width="5" height="5" fill="#b8924a"/>
          <circle cx="5" cy="5" r="1.5" fill="#d4a030"/>
        </pattern>
        <radialGradient id="fb-skin" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#f5c8a0"/>
          <stop offset="100%" stopColor="#e8a878"/>
        </radialGradient>
        <linearGradient id="fb-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0a00"/>
          <stop offset="100%" stopColor="#3d1f00"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="530" fill="#f0ede8"/>

      {/* Decorative corner motifs */}
      <circle cx="30" cy="30" r="20" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="370" cy="30" r="20" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="30" cy="500" r="20" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="370" cy="500" r="20" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.4"/>

      {/* Body / torso */}
      <ellipse cx="200" cy="130" rx="62" ry="85" fill="url(#fb-skin)"/>
      {/* Head */}
      <ellipse cx="200" cy="58" rx="32" ry="34" fill="url(#fb-skin)"/>
      {/* Hair bun */}
      <ellipse cx="200" cy="32" rx="26" ry="18" fill="url(#fb-hair)"/>
      <ellipse cx="200" cy="26" rx="14" ry="10" fill="#2a1000"/>
      <circle cx="200" cy="22" r="5" fill="#1a0a00"/>
      {/* Hair pins */}
      <line x1="192" y1="24" x2="185" y2="18" stroke="#c9a227" strokeWidth="1.5"/>
      <circle cx="184" cy="17" r="2" fill="#c9a227"/>
      <line x1="208" y1="24" x2="215" y2="18" stroke="#c9a227" strokeWidth="1.5"/>
      <circle cx="216" cy="17" r="2" fill="#c9a227"/>

      {/* Face features */}
      <ellipse cx="192" cy="62" rx="3" ry="3.5" fill="#c8906a"/>
      <ellipse cx="208" cy="62" rx="3" ry="3.5" fill="#c8906a"/>
      <path d="M195 70 Q200 74 205 70" fill="none" stroke="#b06040" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M189 58 Q192 56 195 58" fill="none" stroke="#5a3020" strokeWidth="1" strokeLinecap="round"/>
      <path d="M205 58 Q208 56 211 58" fill="none" stroke="#5a3020" strokeWidth="1" strokeLinecap="round"/>
      {/* Bindi */}
      <circle cx="200" cy="52" r="2" fill="#c94a6a"/>

      {/* Necklace */}
      <path d="M176 90 Q200 102 224 90" fill="none" stroke="#c9a227" strokeWidth="2"/>
      {[180,190,200,210,220].map((x,i) => (
        <circle key={i} cx={x} cy={92 + (i===2?4:i===1||i===3?2:0)} r="2.5" fill="#c9a227"/>
      ))}

      {/* Saree body — draped fabric */}
      <path d="M140 200 C118 225 105 295 100 420 L300 420 C295 295 282 225 260 200 Z" fill="url(#fb-zari)"/>
      {/* Zari border at hem */}
      <rect x="100" y="406" width="200" height="20" fill="url(#fb-bdr)" rx="2"/>

      {/* Pallu draped over shoulder */}
      <path d="M260 200 C272 215 285 240 308 268 C325 288 340 320 338 385 L326 385 C328 324 314 295 298 276 C276 250 264 224 252 210 Z" fill="#1a5c35"/>
      {/* Pallu border */}
      <rect x="324" y="205" width="20" height="175" fill="url(#fb-bdr)" rx="2"/>

      {/* Saree pleats / folds */}
      <path d="M150 205 C146 225 140 260 136 300" fill="none" stroke="#c9a227" strokeWidth="1.5" opacity="0.7"/>
      <path d="M170 202 C166 224 160 265 155 308" fill="none" stroke="#c9a227" strokeWidth="1.5" opacity="0.7"/>
      <path d="M190 200 C187 224 183 268 180 312" fill="none" stroke="#c9a227" strokeWidth="1.5" opacity="0.7"/>

      {/* Gold zari motifs on body */}
      <ellipse cx="148" cy="240" rx="9" ry="5" fill="#c9a227" opacity="0.8"/>
      <ellipse cx="175" cy="275" rx="8" ry="4.5" fill="#c9a227" opacity="0.75"/>
      <ellipse cx="160" cy="330" rx="10" ry="5.5" fill="#c9a227" opacity="0.7"/>
      <ellipse cx="200" cy="360" rx="9" ry="5" fill="#c9a227" opacity="0.65"/>
      <circle cx="148" cy="240" r="3" fill="#d4a030"/>
      <circle cx="175" cy="275" r="3" fill="#d4a030"/>
      <circle cx="160" cy="330" r="3" fill="#d4a030"/>

      {/* Blouse */}
      <path d="M152 195 L160 170 L172 178 L200 172 L228 178 L240 170 L248 195 Z" fill="#1a5c35"/>
      <rect x="152" y="190" width="96" height="6" fill="#c9a227" opacity="0.8"/>

      {/* Arms */}
      <ellipse cx="138" cy="210" rx="12" ry="32" fill="url(#fb-skin)" transform="rotate(-8,138,210)"/>
      <ellipse cx="262" cy="220" rx="12" ry="28" fill="url(#fb-skin)" transform="rotate(12,262,220)"/>

      {/* Bangles */}
      {[0,1,2].map(i => (
        <ellipse key={i} cx={126 + i*3} cy={237 + i} rx="8" ry="4" fill="none" stroke="#c9a227" strokeWidth="2"/>
      ))}

      {/* Label */}
      <rect x="100" y="444" width="200" height="32" rx="4" fill="#1a5c35" opacity="0.08"/>
      <text x="200" y="464" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#1a5c35" letterSpacing="2">KANJIVARAM SILK</text>
    </svg>
  );
}
