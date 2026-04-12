import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import productService from "../services/productService";
import "../styles/pages/products.css";

const Products = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // selectedFilters giờ chứa categoryId + featured thay vì mockdata
  const [selectedFilters, setSelectedFilters] = useState({
    categoryId: null,
    featured: null,
  });

  const getGender = (cat) => {
    if (cat === "nam") return "MALE";
    if (cat === "nu") return "FEMALE";
    return null;
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({
        gender: getGender(category),
        categoryId: selectedFilters.categoryId,
        featured: selectedFilters.featured,
        page,
        size,
        sort: "id,desc",
      });
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [category, page, size, selectedFilters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filterType, value) => {
    // Reset về trang 0 khi đổi filter
    searchParams.set("page", "0");
    setSearchParams(searchParams);
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleReset = () => {
    searchParams.set("page", "0");
    setSearchParams(searchParams);
    setSelectedFilters({ categoryId: null, featured: null });
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryName =
    category === "nam" ? "NAM" : category === "nu" ? "NỮ" : "SẢN PHẨM";

  return (
    <div className="products-page">
      <Header />
      <main className="products-main">
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
          <div className="cover-logo">
            <img src="/un1-logo.png" alt="UN1" className="cover-logo-image" />
          </div>
        </div>

        <div className="products-container">
          <ProductFilter
            category={category}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
          <div className="product-list-content" style={{ flex: 1 }}>
            {error ? (
              <div className="error-state">
                <p>{error}</p>
                <button onClick={fetchProducts}>Thử lại</button>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  category={category}
                  loading={loading}
                />
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={page === 0}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      Trước
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={page === i ? "active" : ""}
                        onClick={() => handlePageChange(i)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={page === totalPages - 1}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;