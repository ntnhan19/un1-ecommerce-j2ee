import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import "../../styles/components/product-filter.css";

const ProductFilter = ({ category, selectedFilters, onFilterChange, onReset }) => {
  const [expandedSections, setExpandedSections] = useState({
    collection: true,
    category: true,   // đổi tên section từ "type" → "category" cho đúng nghĩa
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch danh sách category từ backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="product-filter">
      {/* Filter Header */}
      <div className="filter-header">
        <h3>FILTER</h3>
        <span
          className="filter-reset"
          onClick={onReset}
          title="Xóa bộ lọc"
          style={{ cursor: 'pointer' }}
        >
          ↻
        </span>
      </div>

      {/* Featured / New Collection */}
      <div className="filter-section">
        <div
          className="filter-title"
          onClick={() => toggleSection("collection")}
        >
          <span>NỔI BẬT</span>
          <span className="toggle-icon">
            {expandedSections.collection ? "−" : "+"}
          </span>
        </div>
        {expandedSections.collection && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedFilters.featured === true}
                onChange={() => onFilterChange("featured",
                  selectedFilters.featured === true ? null : true
                )}
              />
              <span>Hàng nổi bật</span>
            </label>
          </div>
        )}
      </div>

      {/* Category Filter — từ API */}
      <div className="filter-section">
        <div
          className="filter-title"
          onClick={() => toggleSection("category")}
        >
          <span>LOẠI SẢN PHẨM</span>
          <span className="toggle-icon">
            {expandedSections.category ? "−" : "+"}
          </span>
        </div>
        {expandedSections.category && (
          <div className="filter-options">
            {loadingCategories ? (
              <p style={{ fontSize: '13px', color: '#999', padding: '8px 0' }}>
                Đang tải...
              </p>
            ) : categories.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#999', padding: '8px 0' }}>
                Không có danh mục
              </p>
            ) : (
              categories.map((cat) => (
                <label key={cat.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFilters.categoryId === cat.id}
                    onChange={() =>
                      onFilterChange(
                        "categoryId",
                        selectedFilters.categoryId === cat.id ? null : cat.id
                      )
                    }
                  />
                  <span>{cat.name}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* View All */}
      <div className="filter-footer">
        <span
          className="view-all-link"
          onClick={onReset}
          style={{ cursor: 'pointer' }}
        >
          XEM TẤT CẢ →
        </span>
      </div>
    </aside>
  );
};

export default ProductFilter;