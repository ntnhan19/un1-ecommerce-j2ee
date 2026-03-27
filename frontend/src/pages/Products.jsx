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

  const [selectedFilters, setSelectedFilters] = useState({
    collection: null,
    seller: null,
    type: null,
  });

  // Map category name to ID
  // TODO: Fetch this from an actual Category API later
  const getCategoryId = (cat) => {
    if (cat === "nam") return 1;
    if (cat === "nu") return 2;
    return null;
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryId = getCategoryId(category);
      const data = await productService.getProducts({ 
        category: categoryId,
        page,
        size,
        sort: "id,desc"
      });
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [category, page, size]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
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
            <img
              src="/src/assets/images/un1-logo.png"
              alt="UN1"
              className="cover-logo-image"
            />
          </div>
        </div>

        <div className="products-container">
          <ProductFilter
            category={category}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
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
