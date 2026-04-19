import { Link } from "react-router-dom";
import "./css/home.css";

/**
 * Reusable Card component for Shop By Category section.
 * Props: title, image, link
 */
function Card({ title, image, link }) {
  return (
    <Link to={link} className="category-card">
      <img src={image} alt={title} className="category-card__img" />
      <div className="category-card__overlay" />
      <div className="category-card__info">
        <h3 className="category-card__title">{title}</h3>
        <span className="category-card__cta">
          SHOP NOW
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default Card;
