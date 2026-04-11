import React, { useState, useEffect } from "react";
import "../../styles/components/hero.css";

const HERO_IMAGES = [
  "/hero-image.png",
  "https://static.zara.net/assets/public/757a/614b/65614917be34/7c08ac13734e/01648340400-p/01648340400-p.jpg?ts=1708682121666&w=1920",
  "https://static.zara.net/assets/public/e58d/046e/f894451c8909/7041a773663a/01648310800-p/01648310800-p.jpg?ts=1708533152555&w=1920"
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Chuyển slide mỗi 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Scrolling Marquee Text */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="marquee-text">WELCOME TO UN1</span>
            ))}
          </div>
        </div>

        <div className="hero-background">
          {HERO_IMAGES.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Collection ${index + 1}`}
              className={index === currentSlide ? "active" : "inactive"}
            />
          ))}
        </div>

        <div className="hero-overlay">
          <div className="hero-tag">NEW COLLECTION 2024</div>
          <h1 className="hero-title-main">TIMELESS ELEGANCE</h1>
          <button className="hero-shop-btn">KHÁM PHÁ NGAY</button>
        </div>

        {/* Slide Indicators */}
        <div className="slider-indicators">
          {HERO_IMAGES.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
