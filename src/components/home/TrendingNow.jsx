import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trendingProducts } from "../../data/mockData";
import { useWishlist } from "../../context/WishlistContext";
import "../css/home.css";

const ITEMS_PER_PAGE = 4;

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const liked = isWishlisted(product.id);

  const goToProduct = () => navigate(`/product/${product.id}`);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <div className="product-card__img-wrap" onClick={goToProduct} style={{ cursor: "pointer" }}>
        {product.badge && (
          <span className={`product-card__badge product-card__badge--${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`product-card__wishlist${liked ? " liked" : ""}`}
          onClick={handleWishlist}
          aria-label="Wishlist"
          title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img src={product.image} alt={product.name} className="product-card__img" />
        <button className="product-card__add-to-bag" onClick={(e) => { e.stopPropagation(); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          ADD TO BAG
        </button>
      </div>
      <div className="product-card__info" onClick={goToProduct} style={{ cursor: "pointer" }}>
        <div className="product-card__rating">
          <span className="product-card__rating-star">★</span>
          <span>{product.rating} ({product.reviews})</span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description || product.fabric}</p>
        <div className="product-card__price">
          <span className="product-card__price-current">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="product-card__price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TrendingNow() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(trendingProducts.length / ITEMS_PER_PAGE);
  const visible = trendingProducts.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  return (
    <section className="section--trending">
      <div className="trending-header">
        <div className="trending-header__left">
          <h2>Trending Now</h2>
          <p>Most loved pieces this week</p>
        </div>
        <a href="/products" className="trending-header__view-all">View All →</a>
      </div>
      <div className="product-grid">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="trending-pagination">
        <button className="trending-pagination__arrow" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ opacity: page === 0 ? 0.4 : 1 }}>‹</button>
        <span className="trending-pagination__info">{page + 1} / {totalPages}</span>
        <button className="trending-pagination__arrow" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ opacity: page === totalPages - 1 ? 0.4 : 1 }}>›</button>
      </div>
    </section>
  );
}

export default TrendingNow;
