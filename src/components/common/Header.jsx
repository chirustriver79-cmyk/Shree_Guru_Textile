import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import { navLinks } from "../../data/mockData";

function Header() {
  const location = useLocation();
  const currentFull = location.pathname + location.search;

  const isNavActive = (linkPath) => {
    if (linkPath === "/") return location.pathname === "/";
    return currentFull === linkPath || currentFull.startsWith(linkPath + "&");
  };

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">ॐ</div>
          <div className="header__logo-text">
            <span><em>New</em> Shree Guru</span>
            <span>TEXTILE</span>
          </div>
        </Link>

        <div className="header__search">
          <span className="header__search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" className="header__search-input" placeholder="Search for Sarees, Kurtas, Lehengas..."/>
          <button className="header__search-mic" aria-label="Voice search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
        </div>

        <div className="header__actions">
          <button className="header__action-btn" aria-label="Wishlist">
            <span className="header__badge">2</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="header__action-btn" aria-label="Cart">
            <span className="header__badge header__badge--cart">1</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
          <button className="header__action-btn" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Link instead of NavLink — NavLink adds its own active class which breaks query-string matching */}
      <nav className="header__nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={"header__nav-link" + (isNavActive(link.path) ? " active" : "")}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
