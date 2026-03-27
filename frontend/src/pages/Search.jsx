import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import { mockProductsNam, mockProductsNu } from "../utils/mockProducts";
import "../styles/pages/products.css";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [selectedFilters, setSelectedFilters] = useState({
        collection: null,
        seller: null,
        type: null,
    });

    const allProducts = [...mockProductsNam, ...mockProductsNu];

    // Filter products by query
    const products = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType] === value ? null : value,
        }));
    };

    return (
        <div className="products-page">
            <Header />
            <main className="products-main" style={{ paddingTop: '120px' }}>
                <div className="search-header" style={{ padding: '0 5%', marginBottom: '20px' }}>
                    <h2>Kết quả tìm kiếm cho: "{query}"</h2>
                    <p style={{ color: '#666', marginTop: '10px' }}>Tìm thấy {products.length} sản phẩm</p>
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
                    {products.length > 0 ? (
                        <ProductGrid products={products} category="search" />
                    ) : (
                        <div className="empty-search" style={{ width: '100%', textAlign: 'center', padding: '50px 0' }}>
                            <h3>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}"</h3>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Search;
