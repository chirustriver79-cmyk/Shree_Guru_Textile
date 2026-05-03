import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div>
          <Link to="/" className="footer__brand-logo">
            <div className="footer__brand-icon">ॐ</div>
            <div className="footer__brand-name">
              <span>
                <em>The</em> ETHNIC
              </span>
              <span>COLLECTIVE</span>
            </div>
          </Link>
          <p className="footer__tagline">
            Curating the finest Indian ethnic and fusion wear for the modern
            wardrobe.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-btn" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="footer__social-btn" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="footer__social-btn" aria-label="Pinterest">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.235.994.499 1.806 1.476 1.806 1.772 0 3.136-1.866 3.136-4.561 0-2.387-1.715-4.057-4.163-4.057-2.837 0-4.5 2.128-4.5 4.328 0 .857.33 1.775.741 2.278a.3.3 0 0 1 .069.285c-.075.312-.242 1.001-.275 1.141-.045.183-.148.222-.341.134C5.734 14.628 5 12.862 5 11.3 5 7.78 7.72 4.5 12.52 4.5c3.834 0 6.814 2.732 6.814 6.385 0 3.808-2.4 6.875-5.73 6.875-1.12 0-2.173-.582-2.533-1.269l-.688 2.57c-.249.959-.92 2.163-1.369 2.895.982.29 2.025.445 3.1.445 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <p className="footer__col-title">Shop</p>
          <ul className="footer__links">
            <li><Link to="/women">Women's Collection</Link></li>
            <li><Link to="/men">Men's Collection</Link></li>
            <li><Link to="/wedding">Wedding Edit</Link></li>
            <li><Link to="/sarees">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Help links */}
        <div>
          <p className="footer__col-title">Help</p>
          <ul className="footer__links">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns &amp; Exchanges</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="footer__col-title">Newsletter</p>
          <p className="footer__newsletter-text">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-btn" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2024 The Ethnic Collective. All rights reserved.
        </p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
