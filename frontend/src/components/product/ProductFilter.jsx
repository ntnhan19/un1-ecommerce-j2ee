import React, { useState } from "react";
import "../../styles/components/product-filter.css";
import { getNewCollectionByCategory } from "../../utils/mockProducts";
const ProductFilter = ({ category, selectedFilters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    collection: true,
    seller: true,
    type: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const productTypes = [
    "ÁO KHOÁC",
    "ÁO PHAO",
    "ÁO THUN",
    "ÁO SƠ MI",
    "QUẦN JEANS",
    "QUẦN DA",
  ];



  return (
    <aside className="product-filter">
      {/* Filter Header */}
      <div className="filter-header">
        <h3>FILTER</h3>
        <span className="filter-reset">↻</span>
      </div>

      {/* New Collection Filter */}
      <div className="filter-section">
        <div
          className="filter-title"
          onClick={() => toggleSection("collection")}
        >
          <span>NEW COLLECTION</span>
          <span className="toggle-icon">
            {expandedSections.collection ? "−" : "+"}
          </span>
        </div>
        {expandedSections.collection && (
          <div className="filter-options">
            {/* New Collection Items Grid */}
            <div className="collection-items-grid">
              {getNewCollectionByCategory(category).map((item) => (
                <div key={item.id} className="collection-item">
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>

            {/* Checkbox Option */}
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedFilters.collection === "new"}
                onChange={() => onFilterChange("collection", "new")}
              />
              <span>Hàng mới nhất</span>
            </label>
          </div>
        )}
      </div>

      {/* Best Seller Filter */}
      <div className="filter-section">
        <div className="filter-title" onClick={() => toggleSection("seller")}>
          <span>BEST SELLER</span>
          <span className="toggle-icon">
            {expandedSections.seller ? "−" : "+"}
          </span>
        </div>
        {expandedSections.seller && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedFilters.seller === "bestseller"}
                onChange={() => onFilterChange("seller", "bestseller")}
              />
              <span>Bán chạy nhất</span>
            </label>
          </div>
        )}
      </div>

      {/* Product Type Filter */}
      <div className="filter-section">
        <div className="filter-title" onClick={() => toggleSection("type")}>
          <span>LOẠI SẢN PHẨM</span>
          <span className="toggle-icon">
            {expandedSections.type ? "−" : "+"}
          </span>
        </div>
        {expandedSections.type && (
          <div className="filter-options">
            {productTypes.map((type) => (
              <label key={type} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedFilters.type === type}
                  onChange={() => onFilterChange("type", type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="filter-footer">
        <a href="#" className="view-all-link">
          XEM TẤT CẢ →
        </a>
      </div>
    </aside>
  );
};

export default ProductFilter;
