import React from "react";
import "../../styles/components/product-card.css";

const ProductCardSkeleton = () => {
    return (
        <div className="product-card skeleton">
            <div className="product-image skeleton-box" style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
                <div className="skeleton-line" style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className="product-info">
                <div className="skeleton-line" style={{ width: '80%', height: '20px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}></div>
                <div className="skeleton-line" style={{ width: '40%', height: '16px', backgroundColor: '#f0f0f0' }}></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
