import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { allProducts } from "../data/mockData";
import { useWishlist } from "../context/WishlistContext";
import "../components/css/allProducts.css";

// ─── constants ───────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;
const MIN_PRICE = 0;
const MAX_PRICE = 30000;

const CATEGORY_MAP = {
  female: [
    { key: "sarees",   label: "Sarees",         count: 142 },
    { key: "lehengas", label: "Lehengas",        count: 86  },
    { key: "kurtas",   label: "Kurtas & Suits",  count: 215 },
    { key: "dresses",  label: "Dresses & Gowns", count: 54  },
  ],
  male: [
    { key: "kurtas",    label: "Kurtas",       count: 198 },
    { key: "sherwanis", label: "Sherwanis",    count: 76  },
    { key: "suits",     label: "Suits",        count: 44  },
    { key: "dhotis",    label: "Dhotis",       count: 22  },
  ],
  kids: [
    { key: "kurtas",   label: "Kurta Sets",   count: 88 },
    { key: "lehengas", label: "Lehengas",     count: 42 },
    { key: "dresses",  label: "Dresses",      count: 31 },
  ],
};

const SIZES_ADULT  = ["XS", "S", "M", "L", "XL", "2XL"];
const SIZES_KIDS   = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"];
const FABRICS      = ["Kanjivaram", "Georgette", "Chanderi", "Cotton", "Silk Blend", "Organza", "Velvet", "Net", "Crepe", "Linen", "Raw Silk", "Pure Silk", "Brocade"];
const OCCASIONS    = ["Wedding", "Festive", "Casual", "Party"];
const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
  { value: "rating",      label: "Avg. Customer Review" },
  { value: "newest",      label: "Newest Arrivals" },
];

// ─── Small reusable sub-components ───────────────────────────
function FilterBlock({ label, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ap-filter-block">
      <div className="ap-filter-block__head" onClick={() => setOpen((o) => !o)}>
        <span className="ap-filter-block__label">{label}</span>
        <span className="ap-filter-block__toggle">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="ap-filter-block__body">{children}</div>}
    </div>
  );
}

function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const liked = isWishlisted(product.id);

  const goToProduct = () => navigate(`/product/${product.id}`);

  return (
    <div className="ap-card" onClick={goToProduct}>
      <div className="ap-card__img-wrap">
        {product.badge && (
          <span className={`ap-card__badge ap-card__badge--${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`ap-card__wishlist${liked ? " liked" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          aria-label="Wishlist"
          title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <img src={product.image} alt={product.name} className="ap-card__img" loading="lazy" />

        <div className="ap-card__rating-chip">
          <span className="star">★</span>
          {product.rating}
        </div>

        <div
          className="ap-card__quick-view"
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Quick View
        </div>
      </div>

      <div className="ap-card__info">
        <div className="ap-card__fabric">{product.fabric}</div>
        <div className="ap-card__name">{product.name}</div>
        <div className="ap-card__price-row">
          <span className="ap-card__price">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="ap-card__price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ── read URL params for initial filter state ──
  const urlGender   = searchParams.get("gender")   || null;
  const urlCategory = searchParams.get("category") || null;
  const urlCollection = searchParams.get("collection") || null;

  // ── filter state ──
  const [collection,   setCollection]   = useState(urlCollection || "all");
  const [openGenders,  setOpenGenders]  = useState({ female: urlGender === "female", male: urlGender === "male", kids: urlGender === "kids" });
  const [checkedCats,  setCheckedCats]  = useState(() => {
    if (urlGender && urlCategory) return { [`${urlGender}__${urlCategory}`]: true };
    return {};
  });
  const [priceMin,     setPriceMin]     = useState(MIN_PRICE);
  const [priceMax,     setPriceMax]     = useState(MAX_PRICE);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy,       setSortBy]       = useState("recommended");
  const [viewMode,     setViewMode]     = useState("4"); // "4" | "3" | "list"
  const [page,         setPage]         = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // ── derive active gender from URL or checked cats ──
  const activeGender = useMemo(() => {
    if (urlGender) return urlGender;
    const key = Object.keys(checkedCats).find((k) => checkedCats[k]);
    return key ? key.split("__")[0] : null;
  }, [urlGender, checkedCats]);

  // ── toggle category checkbox ──
  const toggleCat = useCallback((gender, catKey) => {
    const key = `${gender}__${catKey}`;
    setCheckedCats((prev) => ({ ...prev, [key]: !prev[key] }));
    setPage(1);
  }, []);

  // ── toggle gender accordion ──
  const toggleGender = useCallback((g) => {
    setOpenGenders((prev) => ({ ...prev, [g]: !prev[g] }));
  }, []);

  // ── toggle size ──
  const toggleSize = useCallback((sz) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
    setPage(1);
  }, []);

  // ── clear all ──
  const clearAll = () => {
    setCollection("all");
    setCheckedCats({});
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedSizes([]);
    setSortBy("recommended");
    setPage(1);
  };

  // ── filtered + sorted products ──
  const filtered = useMemo(() => {
    let list = [...allProducts];

    // collection filter
    if (collection === "bestsellers") list = list.filter((p) => p.collection === "bestsellers");
    else if (collection === "new")    list = list.filter((p) => p.collection === "new");
    else if (collection === "accessories") list = list.filter((p) => ["jewellery","footwear"].includes(p.category));

    // gender / category
    const activeCats = Object.keys(checkedCats).filter((k) => checkedCats[k]);
    if (activeCats.length > 0) {
      list = list.filter((p) =>
        activeCats.some((k) => {
          const [g, c] = k.split("__");
          return p.gender === g && p.category === c;
        })
      );
    } else if (urlGender) {
      list = list.filter((p) => p.gender === urlGender);
    }

    // price
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);

    // size
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // sort
    if (sortBy === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest")     list = list.filter((p) => p.collection === "new").concat(list.filter((p) => p.collection !== "new"));

    return list;
  }, [collection, checkedCats, urlGender, priceMin, priceMax, selectedSizes, sortBy]);

  // ── pagination ──
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── breadcrumb label ──
  const breadcrumbLabel = useMemo(() => {
    if (urlCategory) {
      const catMap = CATEGORY_MAP[urlGender] || [];
      const found = catMap.find((c) => c.key === urlCategory);
      return found ? found.label : urlCategory;
    }
    if (urlGender) return urlGender.charAt(0).toUpperCase() + urlGender.slice(1);
    return "All Products";
  }, [urlGender, urlCategory]);

  // ── price slider fill % ──
  const fillLeft  = ((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const fillRight = ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  // ── render pagination numbers ──
  const renderPages = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages.map((p) => (
        <button key={p} className={`ap-pagination__page${p === page ? " active" : ""}`} onClick={() => setPage(p)}>{p}</button>
      ));
    }
    return (
      <>
        {[1, 2, 3].map((p) => (
          <button key={p} className={`ap-pagination__page${p === page ? " active" : ""}`} onClick={() => setPage(p)}>{p}</button>
        ))}
        <span className="ap-pagination__ellipsis">…</span>
        {[totalPages - 1, totalPages].map((p) => (
          <button key={p} className={`ap-pagination__page${p === page ? " active" : ""}`} onClick={() => setPage(p)}>{p}</button>
        ))}
      </>
    );
  };

  // ── quick view → navigate to product ──
  const handleQuickView = (product) => navigate(`/product/${product.id}`);

  const sizeOptions = activeGender === "kids" ? SIZES_KIDS : SIZES_ADULT;

  return (
    <div className="ap-page">
      <Header />

      {/* Breadcrumb */}
      <div className="ap-breadcrumb">
        <Link to="/">Home</Link>
        <span className="ap-breadcrumb__sep">›</span>
        {urlGender && (
          <>
            <Link to={`/products?gender=${urlGender}`}>{urlGender.charAt(0).toUpperCase() + urlGender.slice(1)}</Link>
            <span className="ap-breadcrumb__sep">›</span>
          </>
        )}
        <span className="ap-breadcrumb__current">{breadcrumbLabel}</span>
      </div>

      {/* Toolbar */}
      <div className="ap-toolbar">
        <div className="ap-toolbar__results">
          Showing <strong>{filtered.length} results</strong> from {allProducts.length}
        </div>

        {/* Mobile filter toggle */}
        <button
          className="ap-toolbar__filter-btn"
          onClick={() => setFilterDrawerOpen(true)}
          aria-label="Open filters"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
          </svg>
          Filters
        </button>

        <div className="ap-toolbar__sort">
          <span>Sort by:</span>
          <select
            className="ap-toolbar__sort-select"
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="ap-toolbar__view">
          {[
            { mode: "4", icon: (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/>
                <rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/>
              </svg>
            )},
            { mode: "list", icon: (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="1" width="16" height="3" rx="1"/><rect x="0" y="6.5" width="16" height="3" rx="1"/>
                <rect x="0" y="12" width="16" height="3" rx="1"/>
              </svg>
            )},
          ].map(({ mode, icon }) => (
            <button
              key={mode}
              className={`ap-toolbar__view-btn${viewMode === mode ? " active" : ""}`}
              onClick={() => setViewMode(mode)}
              aria-label={`${mode} view`}
            >{icon}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="ap-body">
        {/* ── Mobile filter overlay ── */}
        {filterDrawerOpen && (
          <div
            className="ap-drawer-overlay"
            onClick={() => setFilterDrawerOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside className={`ap-sidebar${filterDrawerOpen ? " ap-sidebar--open" : ""}`}>
          <div className="ap-sidebar__header">
            <span className="ap-sidebar__title">Filters</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="ap-sidebar__clear" onClick={clearAll}>Clear All</button>
              <button
                className="ap-sidebar__close"
                onClick={() => setFilterDrawerOpen(false)}
                aria-label="Close filters"
              >✕</button>
            </div>
          </div>

          {/* Collections */}
          <FilterBlock label="Collections">
            <div className="ap-collection-pills">
              {["all", "bestsellers", "new", "accessories"].map((c) => (
                <button
                  key={c}
                  className={`ap-collection-pill${collection === c ? " active" : ""}`}
                  onClick={() => { setCollection(c); setPage(1); }}
                >
                  {c === "all" ? "All" : c === "bestsellers" ? "Best sellers" : c === "new" ? "New arrivals" : "Accessories"}
                </button>
              ))}
            </div>
          </FilterBlock>

          {/* Categories */}
          <FilterBlock label="Categories">
            {["female", "male", "kids"].map((g) => (
              <div key={g} className="ap-cat-gender">
                <button
                  className={`ap-cat-gender__toggle${openGenders[g] ? " open" : ""}`}
                  onClick={() => toggleGender(g)}
                >
                  <span className="chevron">›</span>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
                {openGenders[g] && (
                  <div className="ap-cat-items">
                    {(CATEGORY_MAP[g] || []).map((cat) => {
                      const key = `${g}__${cat.key}`;
                      return (
                        <div key={key} className="ap-cat-item">
                          <label>
                            <input
                              type="checkbox"
                              checked={!!checkedCats[key]}
                              onChange={() => toggleCat(g, cat.key)}
                            />
                            {cat.label}
                          </label>
                          <span className="ap-cat-item__count">{cat.count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </FilterBlock>

          {/* Price */}
          <FilterBlock label="Price">
            <div className="ap-price-range">
              <div className="ap-price-slider-wrap">
                <div className="ap-price-track" />
                <div
                  className="ap-price-range-fill"
                  style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }}
                />
                <div className="ap-price-thumb" style={{ left: `${fillLeft}%` }} />
                <div className="ap-price-thumb" style={{ left: `${fillRight}%` }} />
                {/* Min slider */}
                <input
                  type="range" className="ap-price-slider"
                  min={MIN_PRICE} max={MAX_PRICE} step={100}
                  value={priceMin}
                  onChange={(e) => {
                    const v = Math.min(Number(e.target.value), priceMax - 500);
                    setPriceMin(v); setPage(1);
                  }}
                  style={{ zIndex: priceMin > MAX_PRICE - 500 ? 5 : 3 }}
                />
                {/* Max slider */}
                <input
                  type="range" className="ap-price-slider"
                  min={MIN_PRICE} max={MAX_PRICE} step={100}
                  value={priceMax}
                  onChange={(e) => {
                    const v = Math.max(Number(e.target.value), priceMin + 500);
                    setPriceMax(v); setPage(1);
                  }}
                  style={{ zIndex: 4 }}
                />
              </div>
              <div className="ap-price-inputs">
                <div className="ap-price-input-wrap">
                  <span>₹</span>
                  <input
                    type="number" value={priceMin}
                    onChange={(e) => { setPriceMin(Math.max(MIN_PRICE, Number(e.target.value))); setPage(1); }}
                  />
                </div>
                <span className="ap-price-to">To</span>
                <div className="ap-price-input-wrap">
                  <span>₹</span>
                  <input
                    type="number" value={priceMax}
                    onChange={(e) => { setPriceMax(Math.min(MAX_PRICE, Number(e.target.value))); setPage(1); }}
                  />
                </div>
              </div>
            </div>
          </FilterBlock>

          {/* Size */}
          <FilterBlock label="Size">
            <div className="ap-size-grid">
              {sizeOptions.map((sz) => (
                <button
                  key={sz}
                  className={`ap-size-btn${selectedSizes.includes(sz) ? " active" : ""}`}
                  onClick={() => toggleSize(sz)}
                >{sz}</button>
              ))}
            </div>
          </FilterBlock>

          {/* Fabric — collapsed by default */}
          <FilterBlock label="Fabric" defaultOpen={false}>
            <div className="ap-size-grid">
              {FABRICS.map((f) => (
                <button key={f} className="ap-size-btn" style={{ minWidth: "auto", padding: "5px 10px" }}>{f}</button>
              ))}
            </div>
          </FilterBlock>

          {/* Occasion — collapsed */}
          <FilterBlock label="Occasion" defaultOpen={false}>
            <div className="ap-collection-pills">
              {OCCASIONS.map((o) => (
                <button key={o} className="ap-collection-pill">{o}</button>
              ))}
            </div>
          </FilterBlock>
        </aside>

        {/* ── Product Area ── */}
        <main className="ap-main">
          {paginated.length === 0 ? (
            <div className="ap-no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or clearing them.</p>
            </div>
          ) : (
            <div className={`ap-grid ap-grid--${viewMode}`}>
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="ap-pagination">
              <button
                className="ap-pagination__btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >← Previous</button>

              {renderPages()}

              <button
                className="ap-pagination__btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >Next →</button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AllProductsPage;
