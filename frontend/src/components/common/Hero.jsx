import React from "react";
import "../../styles/components/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-background">
          <img src="/src/assets/images/hero-image.png" alt="Hero" />
        </div>
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to UN1</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
