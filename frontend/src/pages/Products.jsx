import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import { getProductsByCategory } from "../utils/mockProducts";
import "../styles/pages/products.css";

const Products = () => {
  const { category } = useParams();
  const [selectedFilters, setSelectedFilters] = useState({
    collection: null,
    seller: null,
    type: null,
  });

  // Get products from mock data based on category
  const products = getProductsByCategory(category);

  const categoryName =
    category === "nam" ? "" : category === "nu" ? "" : "SẢN PHẨM";

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  return (
    <div className="products-page">
      <Header />
      <main className="products-main">
        {/* Hero/Cover Section */}
        <div className="products-cover">
          <img
            src={
              category === "nam"
                ? "/src/assets/images/products/man-cover.png"
                : "/src/assets/images/products/woman-cover.png"
            }
            alt={categoryName}
            className="cover-image"
          />
          <div className="cover-overlay">
            <h1 className="cover-title">{categoryName}</h1>
          </div>



          {/* Logo - Positioned absolutely on right */}
          <div className="cover-logo">
            <img
              src="/src/assets/images/un1-logo.png"
              alt="UN1"
              className="cover-logo-image"
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="products-container">
          {/* Sidebar Filter */}
          <ProductFilter
            category={category}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Product Grid */}
          <ProductGrid products={products} category={category} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
