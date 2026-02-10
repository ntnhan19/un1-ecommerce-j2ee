import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/product-card.css";

const ProductCard = ({ product, category }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdded(true);
    // TODO: Add to cart logic
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? "Đã thêm" : "Thêm vào giỏ"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
        <Link
          to={`/product/${category || product.category || "nam"}/${product.id}`}
          className="product-link"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
