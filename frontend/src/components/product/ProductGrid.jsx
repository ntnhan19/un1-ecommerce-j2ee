import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "../../styles/components/product-grid.css";

const ProductGrid = ({ products, category, loading }) => {
  if (loading) {
    return (
      <div className="product-grid-wrapper">
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-wrapper">
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} category={category} />
          ))
        ) : (
          <div className="no-products" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0' }}>
            <h3>Không tìm thấy sản phẩm nào</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
