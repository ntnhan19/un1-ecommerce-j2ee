import React from "react";
import "../../styles/components/product-card.css";

const ProductCardSkeleton = () => {
    return (
        <div className="product-card skeleton">
            <div className="product-image skeleton-box" style={{ height: '300px' }}></div>
            <div className="product-info">
                <div className="skeleton-line" style={{ width: '80%', height: '20px', marginBottom: '10px' }}></div>
                <div className="skeleton-line" style={{ width: '40%', height: '16px' }}></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
