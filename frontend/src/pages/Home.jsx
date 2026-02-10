import React from "react";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import FeaturedProducts from "../components/product/FeaturedProducts";
import ProductShowcase from "../components/product/ProductShowcase";
import Footer from "../components/common/Footer";
import "../styles/pages/home.css";

const Home = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <FeaturedProducts />
      <ProductShowcase />
      <Footer />
    </div>
  );
};

export default Home;
