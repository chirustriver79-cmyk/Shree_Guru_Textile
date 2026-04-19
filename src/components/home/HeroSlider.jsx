import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../data/mockData";
import "../css/home.css";

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <section className="hero-slider">
      {heroSlides.map((slide, i) => (
        <div key={slide.id} className={`hero-slide${i === current ? " active" : ""}`}>
          <img src={slide.bg} alt={slide.title} className="hero-slide__img" />
          <div className="hero-slide__overlay" />
          <div className="hero-slide__content">
            <span className="hero-slide__badge">{slide.badge}</span>
            <h1 className="hero-slide__title">
              {slide.title} <em>{slide.titleItalic}</em>
            </h1>
            <p className="hero-slide__desc">{slide.description}</p>
            <Link to={slide.btnLink} className="hero-slide__btn">
              {slide.btnText}
            </Link>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        className="hero-slider__arrow hero-slider__arrow--prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--next"
        onClick={next}
        aria-label="Next slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero-slider__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-slider__dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
