import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import productService from "../services/productService";
import useDebounce from "../hooks/useDebounce";
import "../styles/pages/products.css";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    
    // Local state for the input field to avoid instantaneous URL updates
    const [searchTerm, setSearchTerm] = useState(query);
    // Debounce the local search term
    const debouncedTerm = useDebounce(searchTerm, 500);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const page = parseInt(searchParams.get("page") || "0");
    const size = parseInt(searchParams.get("size") || "10");

    const [selectedFilters, setSelectedFilters] = useState({
        collection: null,
        seller: null,
        type: null,
    });

    const fetchSearchResults = useCallback(async (term, pageNum) => {
        if (!term.trim()) {
            setProducts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await productService.searchProducts(term, pageNum, size);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            console.error("Error searching products:", err);
            setError("Có lỗi xảy ra trong quá trình tìm kiếm.");
        } finally {
            setLoading(false);
        }
    }, [size]);

    // Effect to sync URL with debounced term and trigger fetch
    useEffect(() => {
        if (debouncedTerm !== query) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("q", debouncedTerm);
            newParams.set("page", "0");
            setSearchParams(newParams);
        }
        
        // Always fetch if we have a debounced term (or clear if empty)
        fetchSearchResults(debouncedTerm, page);
    }, [debouncedTerm, page, fetchSearchResults, setSearchParams, query, searchParams]);

    // Handle initial incoming URL query
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType] === value ? null : value,
        }));
    };

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="products-page">
            <Header />
            <main className="products-main" style={{ paddingTop: '120px' }}>
                <div className="search-header" style={{ padding: '0 5%', marginBottom: '20px' }}>
                    <h2>Kết quả tìm kiếm</h2>
                    <div className="search-input-wrapper" style={{ margin: '20px 0', maxWidth: '500px' }}>
                        <input
                            type="text"
                            placeholder="Tiếp tục tìm kiếm..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <p style={{ color: '#666' }}>Tìm thấy {products.length} sản phẩm</p>
                </div>

                {/* Products Section */}
                <div className="products-container" style={{ marginTop: '0' }}>
                    {/* Sidebar Filter */}
                    <ProductFilter
                        category="nam"
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Product Grid */}
                    <div className="product-list-content" style={{ flex: 1 }}>
                        {error ? (
                            <div className="error-state">
                                <p>{error}</p>
                                <button onClick={() => fetchSearchResults(debouncedTerm, page)}>Thử lại</button>
                            </div>
                        ) : (
                            <>
                                <ProductGrid 
                                    products={products} 
                                    category="search" 
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

export default Search;
